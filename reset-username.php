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
$errors = [];
// Define variables and initialize with empty values
$new_username = $confirm_username = "";
$new_username_err = $confirm_username_err = "";
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

function post_data($field)
{
    if (!isset($_POST[$field])) {
        return false;
    }
    $data = $_POST[$field];
    return htmlspecialchars(stripslashes($data));
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reset Username</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
        .wrapper{ width: 350px; padding: 20px; }
    </style>
</head>
<body>
    <div class="wrapper">
        <h2>Reset Username</h2>
        <p>Please fill out this form to reset your username.</p>
        <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post" novalidate>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>Username</label>
                <input class="form-control <?php echo isset($errors['new_username']) ? 'is-invalid' : '' ?>"
                       name="new_username" value="<?php echo "" ?>">
                <small class="form-text text-muted">Min: 6 and max 16 characters</small>
                <div class="invalid-feedback">
                    <?php echo $errors['new_username_err'] ?? '' ?>
                </div>
            </div>
        </div>
    </div>    
</body>
</html>