<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

// Include config file
require_once "config.php";

//Username Reset
$errors = [];
// Define variables and initialize with empty values
$new_username = "";
$new_username_err = "";
$insertionCheck = true;

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    $new_username = post_data('new_username');
    if (!$new_username) {
        $errors['new_username'] = REQUIRED_FIELD_ERROR;
        $insertionCheck = false;
    } else if (strlen($new_username) < 6 || strlen($new_username) > 16){
        $errors['new_username'] = 'Username must be less than 16 and more than 6 chars';
        $insertionCheck = false;
    } else {
        $sql = "SELECT * FROM user WHERE username = '$new_username'";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) > 0){
            $new_username_err = "This username is already taken.";
            $insertionCheck = false;
        } else{
            $new_username = trim($_POST["new_username"]);
        }
    }
    
    // Check input errors before updating the database
    if(empty($new_username_err) && empty($confirm_username_err) && $insertionCheck){
        // Prepare an update statement
        $sql = "UPDATE user SET username = ? WHERE id = ?";
        
        if($stmt = mysqli_prepare($conn, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "si", $param_username, $param_id);
            
            // Set parameters
            $param_username = $_POST["new_username"];
            $param_id = $_SESSION["id"];
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Password updated successfully. Destroy the session, and redirect to login page
                session_destroy();
                header("location: login.php");
                exit();
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
            
            // Close statement
            mysqli_stmt_close($stmt);
        }
    }
    
    // Close connection
    mysqli_close($conn);
}


//Password Reset
// Define variables and initialize with empty values
$new_password = $confirm_password = "";
$new_password_err = $confirm_password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Validate new password
    if(empty(trim($_POST["new_password"]))){
        $new_password_err = "Please enter the new password.";     
    } else if(strlen(trim($_POST["new_password"])) < 9 || !passCheck($_POST["new_password"])){
        $new_password_err = "Το password πρέπει να είναι τουλάχιστον 8 χαρακτήρες και να περιέχει τουλάχιστον ένα κεφαλαίο γράμμα, ένα αριθμό και κάποιο σύμβολο (π.χ. .!#$*&@).";
    } else{
        $new_password = trim($_POST["new_password"]);
    }
    
    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm the password.";
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($new_password_err) && ($new_password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }
        
    // Check input errors before updating the database
    if(empty($new_password_err) && empty($confirm_password_err)){
        // Prepare an update statement
        $sql = "UPDATE user SET password = ? WHERE id = ?";
        
        if($stmt = mysqli_prepare($conn, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "si", $param_password, $param_id);
            
            // Set parameters
            $param_password = password_hash($new_password, PASSWORD_DEFAULT);
            $param_id = $_SESSION["id"];
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Password updated successfully. Destroy the session, and redirect to login page
                session_destroy();
                header("location: login.php");
                exit();
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }
    // Close connection
    mysqli_close($conn);
}



function post_data($field)
{
    if (!isset($_POST[$field])) {
        return false;
    }
    $data = $_POST[$field];
    return htmlspecialchars(stripslashes($data));
}

function passCheck($string){
    if ($string[0] !== ' ' && preg_match('/[A-Z]/', $string) && preg_match('/[0-9]/', $string) && preg_match('/[.!@#$&*]/', $string) && substr($string, -1) !== ' '){
        return true;
    }
    return false;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reset Username</title>
    <link rel="stylesheet" type="text/css" href="./style.css">
    <link rel="stylesheet" type="text/css" href="./statistics.css">
</head>
<style>

h2,h4,p {
  text-align:center;
}

.form-group{
    padding:1%;
    text-align:center;
}

.menu-space{
    padding:10%;
}

</style>
<body>
    <button onclick="showResetUsername()">Click Me</button>
    <button onclick="showResetPassword()">Click Me</button>
    <button onclick="showStatistics()">Click Me</button>
    <img class="resize" src="images/logo-header.png" alt="Logo"/>
        <br style="clear:both">
        <div class="topnav">
            <a href="http://localhost/project/welcome.php">Home</a>
            <a class="active" href="http://localhost/project/user_profile.php">User Profile</a>
            <a href="http://localhost/project/logout.php">Logout</a>
        </div>
        <hr class="solid">
    <div id="ResetUsername">
        <h2>Reset Username</h2>
        <p>Please fill out this form to reset your username.</p>
        <div class="wrapper">
        <form class="my-form" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post" novalidate>
            <div class="form-group">
                <h4>Username</h4>
                <input class="form <?php echo isset($errors['new_username']) ? 'is-invalid' : '' ?>"
                       name="new_username" value="<?php echo "" ?>">
                <small class="form-text text-muted"><b>Min: 6 and max 16 characters<b></small>
                <div class="invalid-feedback">
                    <?php echo $errors['new_username_err'] ?? '' ?>
                </div>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit">
                <a class="btn btn-link" href="welcome.php">Cancel</a>
            </div>
        </form>
        </div>
    </div>

    <div id="ResetPassword">
        <h2>Reset Password</h2>
        <p>Please fill out this form to reset your password.</p>
        <div class="wrapper">
        <form class="my-form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post"> 
            <div class="form-group <?php echo (!empty($new_password_err)) ? 'has-error' : ''; ?>">
                <h4>New Password</h4>
                <input type="password" name="new_password" class="form-control" value="<?php echo $new_password; ?>">
                <span class="help-block"><?php echo $new_password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                <h4>Confirm Password</h4>
                <input type="password" name="confirm_password" class="form-control">
                <span class="help-block"><?php echo $confirm_password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit">
                <a style="text-align:center;"class="btn btn-link" href="welcome.php">Cancel</a>
            </div>
        </form>
        </div>
    </div>
<p></p>
    <div id="ShowStatistics">
      <h2>Your Statistics</h2>
        <table id="content-table">
        <thead>
        <tr> 
            <th>Ημερομηνία Τελευταίου Upload</th>
            <th>Πλήθος Εγγραφών</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td id="last_upload"></td>
            <td id="total_entries"></td>
            </tr>
        </tbody>
        </table>
    </div>
    <script src="user_profile.js"></script>
</body>
</html>    


