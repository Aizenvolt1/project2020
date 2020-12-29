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

p{
    font-weight: normal;
}
.form-group{
    padding:1%;
}

.menu-space{
    padding:10%;
}

</style>
<body>
    <img class="resize" src="images/logo-header.png" alt="Logo"/>
        <br style="clear:both">
        <div class="topnav">
            <a href="http://localhost/project/welcome.php">Home</a>
            <a class="active" href="http://localhost/project/user_profile.php">User Profile</a>
            <a href="http://localhost/project/logout.php">Logout</a>
        </div>
    <hr class="solid"/>
        <div class="side_nav">
            <button class="nav_btn" onclick="showResetUsername()">Reset Username</button>
            <button class="nav_btn" onclick="showResetPassword()">Reset Password</button>
            <button class="nav_btn" onclick="showStatistics()">Show Statistics</button>
        </div>
    <div class="flex-container">
        <div id="ResetUsername">
        <h2>Reset Username</h2>
        <p>Please fill out this form to reset your username.</p>
            <form name="u-form" id="new-username" action="<?php echo 'reset-username.php'; ?>" method="post">
                <div class="form-group">
                    <h4>Username</h4>
                    <input class="form-control" name="new_username">
                    <small><b>Min: 6 and max 16 characters<b></small>
                    <div>
                    <span id="username-help-block"></span>
                    </div>
                </div>
                <div class="form-group">
                    <input type="button" class="btn btn-primary"  value="Submit" onclick="username_check()">
                    <a class="btn btn-link" href="welcome.php">Cancel</a>
                </div>
            </form>
        </div>
    <div id="ResetPassword">
        <h2>Reset Password</h2>
        <p>Please fill out this form to reset your password.</p>
        <form name= "pass-form" id="new-password" action ="<?php echo  htmlspecialchars('reset-password.php');?>" method="post"> 
            <div class="form-group">
                <h4>New Password</h4>
                <input type="password" class="form-control" name="new_password">
                <span id="password-help-block"></span>
            </div>
            <div class="form-group">
                <h4>Confirm Password</h4>
                <input type="password" class="form-control" name="confirm_password">
            </div>
             <div class="form-group">
                    <input type="button" class="btn btn-primary"  value="Submit" onclick="password_check()">
                    <a class="btn btn-link" href="welcome.php">Cancel</a>
            </div>
        </form>    
    </div>
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
    </div>
    <script src="user_profile.js"></script>
</body>
</html>    


