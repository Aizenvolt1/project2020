
<?php
session_start();

require_once "config.php";
// Directory to upload
$target_dir = "uploads.json/";
// File Path
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
// Extension
$fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$uploadOk = 1;

// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 50000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow certain file extensions
if($fileType !== "har") {
    echo "Sorry, only HAR files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk === 0) {
    echo "Sorry, your file was not uploaded.";
// If everything is ok, try to upload files
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_dir)) {
        echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded." . "<br>";
        $sql = "INSERT INTO user_files (user_id, file_name) VALUES (?, ?)";
        if ($stmt = mysqli_prepare($conn, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "is", $param_userID, $param_fileName);
            $param_userID = $_SESSION["id"];
            $param_fileName = basename($_FILES["fileToUpload"]["name"]);
            // Attempt to execute the prepared statement
            if (mysqli_stmt_execute($stmt)){
                echo "File successfully integrated";
            } else {
                echo "Something went wrong. Please try again later.";
            }
            // Close statement
            mysqli_stmt_close($stmt);
        }
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>
    <p>
        <a href="login.php" class="btn btn-primary">Go Back</a>
    </p>
</body>
</html>