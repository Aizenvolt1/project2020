<?php

$zip = new ZipArchive;
$fileType = strtolower(pathinfo($_FILES["fileToUpload"]["name"],PATHINFO_EXTENSION));
$uploadOk = 1;
$harUploadOk = 1;

if ($_FILES["fileToUpload"]["size"] > 50000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

if($fileType !== "zip") {
    echo "Sorry, only zip files are allowed.";
    $uploadOk = 0;
}

$zip->open($_FILES["fileToUpload"]["tmp_name"]);
for($i = 0; $i < $zip->numFiles; $i++ ){
    $stat = $zip->statIndex( $i );
    $exFileType = strtolower(pathinfo($stat['name'],PATHINFO_EXTENSION));
    if ($exFileType !== "har"){
        $harUploadOk = 0;
    }
}
$zip->close();

//Extracts zip files
if ($zip->open($_FILES["fileToUpload"]["tmp_name"]) === TRUE && $harUploadOk===1) {
    $zip->extractTo('extracted_zip_files/');
    $zip->close();
    echo "Upload completed successfully.";
} else {
    echo "failed";
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