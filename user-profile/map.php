<?php

// Initialize the session
session_start();
// Include config file
require_once "../config.php";

$sql = "SELECT latitude, longitude FROM user_files WHERE user_id = $_SESSION[id] AND CITY IS NOT NULL LIMIT 1" ;

$result = mysqli_query($conn, $sql);
if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["latitude"] . "+" . $row["longitude"];
    }
}
else{
    $last_upload=0;
    $total_entries=0;
}

?>