<?php

session_start();

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: welcome.php");
    exit;
}

function passCheck($string){
    if ($string[0] !== ' ' && preg_match('/[A-Z]/', $string) && preg_match('/[0-9]/', $string) && preg_match('/[.!@#$&*]/', $string) && substr($string, -1) !== ' '){
        return true;
    }
    return false;
}

define('REQUIRED_FIELD_ERROR', 'This field is required');

require_once "config.php";
$errors = [];
$username = $email = $password = $password_confirm = /*$r_password = */"";
$postData = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = post_data('username');
    $email = post_data('email');
    $password = htmlspecialchars($_POST['password']);
    $password_confirm = htmlspecialchars($_POST['password_confirm']);
    $insertionCheck = true;
    if (!$username) {
        $errors['username'] = REQUIRED_FIELD_ERROR;
        $insertionCheck = false;
    } else if (strlen($username) < 6 || strlen($username) > 16){
        $errors['username'] = 'Username must be less than 16 and more than 6 chars';
        $insertionCheck = false;
    } else {
        $sql = "SELECT * FROM user WHERE username = '$username'";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) > 0){
            $username_err = "This username is already taken.";
            $insertionCheck = false;
        } else{
            $username = trim($_POST["username"]);
        }
    }

    if (!$email) {
        $errors['email'] = REQUIRED_FIELD_ERROR;
        $insertionCheck = false;
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $errors['email'] = 'Please enter valid email address';
        $insertionCheck = false;
    } else{
        $email = trim($_POST["email"]);
    }
    if (!$password) {
        $errors['password'] = REQUIRED_FIELD_ERROR;
        $insertionCheck = false;
    } else if (strlen($password) < 9 || !passCheck($password)){
        $errors['password'] = "Το password πρέπει να είναι τουλάχιστον 8 χαρακτήρες και να περιέχει τουλάχιστον ένα κεφαλαίο γράμμα, ένα αριθμό και κάποιο σύμβολο (π.χ. .!#$*&@).";
        $insertionCheck = false;
    } else{
        $password = trim($_POST["password"]);
    } 
    if (!$password_confirm) {
        $errors['password_confirm'] = REQUIRED_FIELD_ERROR;
        $insertionCheck = false;
    }
    if ($password && $password_confirm && strcmp($password, $password_confirm) !== 0){
        $errors['password_confirm'] = 'Please repeat the password correctly';
        $insertionCheck = false;
    }

    if ($insertionCheck){
        $sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
        
        if ($stmt = mysqli_prepare($conn, $sql)){
            // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "sss", $param_username, $param_email, $param_password/*, $param_password_r*/);
            $param_username = $username;
            $param_email = $email;
            $param_password = password_hash($password, PASSWORD_DEFAULT);
            //$param_password_r = $password;
            // Attempt to execute the prepared statement
            if (mysqli_stmt_execute($stmt)){
                // Redirect to login page
                header("location: login.php");
            } else {
                echo "Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
        //header('Location: homepage.php');
    }
}

function post_data($field)
{
    if (!isset($_POST[$field])) {
        return false;
    }
    $data = $_POST[$field];
    return htmlspecialchars(stripslashes(trim($data)));
}


?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="./style.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
            .wrapper{ width: 350px; padding: 20px; }
    </style>
</head>
<body style="position: relative">
<div class="wrapper">
<h2>Register</h2>
<p>Please fill the boxes to register.<p>
<form class="my-form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" novalidate>
    <div class="row">
        <div class="col">
            <div class="form-group">   
            <label>Username</label>
                <input class="form-control <?php echo isset($errors['username']) ? 'is-invalid' : '' ?>"
                       name="username" value="<?php echo "" ?>">
                <small class="form-text text-muted">Min: 6 and max 16 characters</small>
                <div class="invalid-feedback">
                    <?php echo $errors['username'] ?? '' ?>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="form-group">   
            <label>Email</label>
                <input type="email" class="form-control <?php echo isset($errors['email']) ? 'is-invalid' : '' ?>"
                       name="email" value="<?php echo $email ?>">
                <div class="invalid-feedback">
                    <?php echo $errors['email'] ?? '' ?>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control <?php echo isset($errors['password']) ? 'is-invalid' : '' ?>"
                    name="password" value="<?php echo "" ?>">
                <div class="invalid-feedback">
                    <?php echo $errors['password'] ?? '' ?>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="form-group">
                <label>Repeat Password</label>
                <input type="password"
                       class="form-control <?php echo isset($errors['password_confirm']) ? 'is-invalid' : '' ?>"
                       name="password_confirm" value="<?php echo $password_confirm ?>">
                <div class="invalid-feedback">
                    <?php echo $errors['password_confirm'] ?? '' ?>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group-submit">
                <input type="submit" class="btn btn-primary" value="Login">
            </div>
    <p>Already Have an Account? <a class="Sign-up" href="login.php">Login Now.</a>.</p>
</form>
</div>  

</body>
</html>
