<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

if(isset($_SESSION["role"]) && $_SESSION["role"] == "admin")
{
    $call = "your";
}
else
{
    $call = "our";
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Welcome</title>
        <link rel="stylesheet" type="text/css" href="./style.css">
        <style type="text/css">
            body{ font: 14px sans-serif; text-align: center; }
        </style>
    </head>
    <body>
        <img class="resize" src="images/logo-header.png" alt="Logo"/>
        <br style="clear:both">
        <div class="topnav">
            <a class="active" href="http://localhost/project/welcome.php">Home</a>
            <a href="http://localhost/project/user-profile/user_profile.php">User Profile</a>
            <a id="admin-only" href="http://localhost/project/users-info/users_info.php">Users Info</a>
            <a href="http://localhost/project/logout.php">Logout</a>
        </div>
        <hr class="solid"/>
        <div class="menu-space"></div>
        <div class="page-header">
            <h1>Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>. Welcome to <b><?php echo $call ?></b> site.</h1>
        </div>
        <div class="menu-space"></div>
        <div id="drop_area" draggable="true">
            <p>Drag one or more files to this Drop Zone ...</p>
        </div>
        <div class="menu-space"></div>
        <input
            type="file"
            multiple
            id="input"
            style="display: none"
            accept=".har"
        />
        <button id="upldBtn" type="button" class="open-button">Upload File</button>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="http://cdn.jsdelivr.net/g/filesaver.js"></script>
        <script src="./file-processing/uploads.js"></script>
        <button class="open-button" onclick="openForm()" type="button" id="sbmBtn" disabled>Submit Files</button>
        <script>
            document.getElementById("upldBtn").addEventListener("click", enableButton);

            function enableButton() {
                document.getElementById("sbmBtn").disabled = false;
            }
            document.getElementById("sbmBtn").addEventListener("click", openForm);
            function openForm() {
                document.getElementById("myForm").style.display = "block";
            }

            function closeForm() {
                document.getElementById("myForm").style.display = "none";
            } 
        </script>
        <div class="form-popup" id="myForm">
            <form action="welcome.php" class="form-container">
                <h3>Choose what you want to do with your file.</h3>
                <div class="menu-space"></div>
                <button type="button" id="sfiles" onclick="datatoPHP()" class="btn">Upload file(s) to Server </button>
                <button type="button" id="dfiles" onclick= "downloadLoop()" class="btn">Download file(s) to your Computer</button>
                <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
            </form>
        </div>
        <script>

        $.ajax({
            type: "POST",
            url: "./users-info/collect_data.php",
            data: {
            request: "request_role",
            },
            success: function (res) {
                let adon = document.getElementById("admin-only");
                if(res.trim()==="admin")
                {
                    adon.style.display="block";
                }
            },
        });
        </script> 
    </body>
</html>