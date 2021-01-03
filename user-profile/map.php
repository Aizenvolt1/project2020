<?php

// Initialize the session
session_start();
// Include config file
require_once "../config.php";

$sql = "SELECT city_latitude, city_longitude FROM user_files WHERE user_id = $_SESSION[id] LIMIT 1" ;

$result = mysqli_query($conn, $sql);
if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if($row["city_latitude"] != null && $row["city_longitude"] != null)
        {
            echo $row["city_latitude"] . "+" . $row["city_longitude"];
        }
        else{
            echo "nothing";
        }
    }
}

?>