<?php

// Initialize the session
session_start();
// Include config file
require_once "../config.php";

//Number of Users
if($_POST['request'] == "number_of_users")
{
    $sql = "SELECT COUNT(*) as number_of_users FROM user WHERE role='user'";

    $result = mysqli_query($conn, $sql);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo $row["number_of_users"];
        }
    }
}
//Number of request methods by type
else if($_POST['request'] == "request_method_statistics")
{
    $sql = "SELECT 
    SUM(CASE WHEN request_methods = 'POST' THEN 1 ELSE 0 END) AS nop, 
    SUM(CASE WHEN request_methods = 'GET' THEN 1 ELSE 0 END) AS nog,
    SUM(CASE WHEN request_methods = 'HEAD' THEN 1 ELSE 0 END) AS noh, 
    SUM(CASE WHEN request_methods = 'PUT' THEN 1 ELSE 0 END) AS nopu,
    SUM(CASE WHEN request_methods = 'DELETE' THEN 1 ELSE 0 END) AS nod, 
    SUM(CASE WHEN request_methods = 'CONNECT' THEN 1 ELSE 0 END) AS noc,
    SUM(CASE WHEN request_methods = 'OPTIONS' THEN 1 ELSE 0 END) AS noo, 
    SUM(CASE WHEN request_methods = 'TRACE' THEN 1 ELSE 0 END) AS notr
    FROM file_data";
    $result = mysqli_query($conn, $sql);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo $row["nop"] . "+" . $row["nog"] . "+" . $row["noh"] . "+" . $row["nopu"] . "+" .  $row["nod"] . "+" . $row["noc"] . "+" . $row["noo"] . "+" . $row["notr"];
        }
    }
}
else if($_POST['request'] == "request_number_of_response_statuses")
{
    if($_POST['request_type'] == "element")
    {
        $response_statuses = array();
        $sql = "SELECT DISTINCT response_statuses FROM file_data WHERE response_statuses IS NOT NULL ORDER BY response_statuses ASC";

        $result = mysqli_query($conn, $sql);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($response_statuses,$row["response_statuses"]);
            }
        }
        echo json_encode($response_statuses);
    }
    else if($_POST['request_type'] == "value")
    {
        $sql = "SELECT COUNT(response_statuses) AS num FROM file_data WHERE response_statuses = $_POST[value_name]";

        $result = mysqli_query($conn, $sql);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo $row["num"];
            }
        }
    }
}
else if($_POST['request'] == "request_number_of_unique_domains")
{
    $sql="SELECT COUNT(DISTINCT domain) AS unique_urls FROM user_files";
    $result = mysqli_query($conn, $sql);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo $row["unique_urls"];
        }
    }
}
else if($_POST['request'] == "request_number_of_unique_isps")
{
    $sql="SELECT COUNT(DISTINCT isp) AS unique_isp FROM user_files";
    $result = mysqli_query($conn, $sql);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo $row["unique_isp"];
        }
    }
}
else if($_POST['request'] == "request_content_type_info")
{
    if($_POST['request_type'] == "content_type")
    {
        $content_types = array();
        $sql = "SELECT DISTINCT response_content_types FROM file_data WHERE response_content_types IS NOT NULL ORDER BY response_content_types ASC";

        $result = mysqli_query($conn, $sql);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($content_types,$row["response_content_types"]);
            }
        }
        echo json_encode($content_types);
    }
    else if($_POST['request_type'] == "average_age")
    {
        $sql="SELECT AVG(response_ages) AS avg_age FROM file_data WHERE response_content_types = '$_POST[value_name_content]'";
        $result = mysqli_query($conn, $sql);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                if($row["avg_age"]!=null)
                {
                    echo $row["avg_age"];
                }
                else
                {
                    echo "-";
                }
            }
        }
    }
}
else if($_POST['request'] == "request_time_analysis")
{
    $first_date_array= array();
    $second_date_array = array();
    $first_date;
    $second_date;
    $avg_time = array();
    for($i = 0; $i < 24; $i++)
    {   
        $first_date = date("$i:00:00");
        $second_date = date("$i:59:59");
        array_push($first_date_array,$first_date);
        array_push($second_date_array,$second_date);
    }
    for($i = 0; $i < 24; $i++)
    {
        $sql="SELECT AVG(timings_wait) as avg_time FROM file_data WHERE cast(started_date_times as time) 
        BETWEEN '$first_date_array[$i]' AND '$second_date_array[$i]'";
        $result = mysqli_query($conn, $sql);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($avg_time,$row["avg_time"]);
            }
        }
    }
    echo json_encode($avg_time);
}
if($_POST['request'] == "request_role")
{
    if($_SESSION["role"] == "admin")
    {
        echo "admin";
    }
    else {
        echo "user";
    }
}
?>