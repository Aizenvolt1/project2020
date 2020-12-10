<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
    <link rel="stylesheet" type="text/css" href="./popup.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
        .wrapper{ width: 350px; padding: 20px; }
    </style>
        <meta charset="UTF-8">
        <title>Welcome</title>
        <link rel="stylesheet" type="text/css" href="./style.css">
        <style type="text/css">
            body{ font: 14px sans-serif; text-align: center; }
        </style>
    </head>
    <body>
        <div class="page-header">
            <h1>Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>. Welcome to our site.</h1>
        </div>
        <a href="reset-username.php" class="btn btn-warning">Reset Your Username</a>
        <a href="reset-password.php" class="btn btn-warning">Reset Your Password</a>
        <a href="logout.php" class="btn btn-danger">Sign Out of Your Account</a>
        <div id="drop_area" draggable="true">
            <p>Drag one or more files to this Drop Zone ...</p>
        </div>
        <input
            type="file"
            multiple
            id="input"
            style="display: none"
            accept=".har"
        />
        <button type="button" id="upldBtn">Upload File</button>
        <script src="uploads.js"><script></script>
        <button class="open-button" onclick="openForm()" type="button" id="sbmBtn" disabled>Submit Files</button>
        <script>
            document.getElementById("upldBtn").addEventListener("click", enableButton);

            function enableButton() {
                document.getElementById("sbmBtn").disabled = false;
            }
        </script>
        <script>
            document.getElementById("sbmBtn").addEventListener("click", openForm)
            function openForm() {
                document.getElementById("myForm").style.display = "block";
            }

            function closeForm() {
                document.getElementById("myForm").style.display = "none";
            } 
        </script>
        <div class="form-popup" id="myForm">
            <form action="welcome.php" class="form-container">
                <h2>Choose what you want to do with your file.</h2>
                <button type="submit" class="btn">Upload to System</button>
                <button type="submit" onclick="downloadFile(0,0)" class="btn">Download to your Computer</button>
                <button type="submit" class="btn cancel" onclick="closeForm()">Close</button>
            </form>
        </div> 
    </body>
</html>