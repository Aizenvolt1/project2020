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
    <button>Upload File</button>
    <script src="uploads.js"></script></script>
</body>
</html>