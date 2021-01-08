<?php

session_start();

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: ../welcome.php");
    exit;
}

require_once "../config.php";

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <style type="text/css">
        h2{
            text-align:left;
        }
        .small-space{
            padding:4%;
        }

        h2,p{
            margin-bottom:0;
        }

        .small-margin{
            padding:1%;
        }
    </style>
</head>
<body class="preload" id="logBody">
    <div class="small-space"></div>
    <form id="reg-form" name="registration-form" class="reg">
        <div id="login-red-box"></div>
        <ul class="flex-login">
            <li>
                <h2>Register</h2>
                <p>Please fill the boxes to register.<p>
            </li>
            <li>
                <label class="label-color">Username</label>
                <input type="text" class="form-control" name="username">
                <div class="small-margin"> </div>
                <small class="form-text text-muted">Min: 6 and max 16 characters</small>
                <div class="small-margin"> </div>
                <span id="user-help"></span>
            </li>
            <li>
                <label class="label-color">Email</label>
                <div class="small-margin"> </div>
                <input type="email" class="form-control" name="email">
                <div class="small-margin"> </div>
                <span id="email-help"></span>
            </li>
            <li>
                <label class="label-color">Password</label>
                <div class="small-margin"> </div>
                <input type="password" class="form-control" name="password">
                <div class="small-margin"> </div>
                <span id="pass-help"></span>
            </li>
            <li>
                <label class="label-color">Repeat Password</label>
                <div class="small-margin"> </div>
                <input type="password" class="form-control" name="password_confirm">
                <div class="small-margin"> </div>
                <span id="passc-help"></span>
            </li>
            <li>
                <br>
                <input type="button" class="btn btn-primary" id="sum" value="Submit" onclick="registration_validation()">
            </li>
            <p style="text-align:center;">Already have an account? <a class="Sign-up" href="../login/login.php">Login now</a>.</p>
        </ul>
    </form>
    <script src="registration.js"></script>
    <div class="ocean">
            <div class="wave"></div>
            <div class="wave"></div>
        </div>
</body>
</html>
