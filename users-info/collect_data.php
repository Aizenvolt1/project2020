<?php

// Initialize the session
session_start();
// Include config file
require_once "../config.php";
//Statistics
$sql = "SELECT COUNT(*) as number_of_users FROM user WHERE role='user'";

$result = mysqli_query($conn, $sql);
if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["number_of_users"];
    }
}
?>