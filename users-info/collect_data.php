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
    $sql="SELECT COUNT(DISTINCT request_urls) AS unique_urls FROM file_data";
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
        $sql="SELECT AVG(started_date_times - response_last_modified) AS avg_age FROM file_data WHERE response_content_types = '$_POST[value_name_content]' AND response_last_modified IS NOT NULL";
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
    $first_date_array = array();
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
else if($_POST['request'] == "request_isp_chart")
{
    $chart_data = array();
    $isps_array = array();
    $first_date_array = array();
    $second_date_array = array();
    $first_date;
    $second_date;
    $avg_time = array();

    $sql = "SELECT DISTINCT(isp) as isp FROM user_files WHERE isp IS NOT NULL";
    $result = mysqli_query($conn, $sql);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($isps_array,$row["isp"]);
        }
    }

    for($i = 0; $i < 24; $i++)
    {   
        $first_date = date("$i:00:00");
        $second_date = date("$i:59:59");
        array_push($first_date_array,$first_date);
        array_push($second_date_array,$second_date);
    }

    for($i = 0; $i < count($isps_array); $i++)
    {
        for($j = 0; $j < 24; $j++)
        {
            $sql="SELECT AVG(file_data.timings_wait) as avg_time FROM file_data 
            INNER JOIN user_files ON file_data.file_number=user_files.file_number 
            WHERE cast(file_data.started_date_times as time) 
            BETWEEN '$first_date_array[$j]' AND '$second_date_array[$j]' AND user_files.isp='$isps_array[$i]'";
            $result = mysqli_query($conn, $sql);
            if($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($avg_time,$row["avg_time"]);
                }
            }
        }
        if($i<count($isps_array)-1)
        {
            array_push($avg_time,"+");
        }
    }
    array_push($isps_array,"//");
    $chart_data=array_merge($isps_array,$avg_time);
    echo json_encode($chart_data);
}
else if($_POST['request'] == "request_distinct_isps")
{
    $distinct_isps = array();
    $sql = "SELECT DISTINCT(isp) as isp FROM user_files WHERE isp IS NOT NULL";
    $result = mysqli_query($conn, $sql);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($distinct_isps,$row["isp"]);
        }
    }
    echo json_encode($distinct_isps);
}
else if($_POST['request'] == "request_distinct_http_methods")
{
    $distinct_http_methods = array();
    $sql = "SELECT DISTINCT(request_methods) as http_methods FROM file_data WHERE request_methods IS NOT NULL";
    $result = mysqli_query($conn, $sql);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($distinct_http_methods,$row["http_methods"]);
        }
    }
    echo json_encode($distinct_http_methods);
}
else if($_POST['request'] == "request_filtered_data")
{
    $chosen_ct_filters = json_decode($_POST['chosen_ct_filters'],true);
    $chosen_dotw_filters = json_decode($_POST['chosen_dotw_filters'],true);
    $chosen_http_filters = json_decode($_POST['chosen_http_filters'],true);
    $chosen_isp_filters = json_decode($_POST['chosen_isp_filters'],true);

    $first_date_array = array();
    $second_date_array = array();
    $first_date;
    $second_date;

    if(empty($chosen_ct_filters) || $chosen_ct_filters[0]=="All Content-Types")
    {
            $ct_args = "file_data.response_content_types IS NOT NULL"; 
    }
    else if($chosen_ct_filters[0]!="All Content-Types" && count($chosen_ct_filters)==1)
    {
        $ct_args = "file_data.response_content_types = '$chosen_ct_filters[0]'";
    }
    else if($chosen_ct_filters[0]!="All Content-Types" && count($chosen_ct_filters)>1)
    {
        for($i=0;$i<count($chosen_ct_filters);$i++)
        {
            if($i==0)
            {
                $ct_args = "(file_data.response_content_types = '$chosen_ct_filters[$i]' OR "; 
            }
            if($i>0 && $i<count($chosen_ct_filters)-1)
            {
                $ct_args .= "file_data.response_content_types = '$chosen_ct_filters[$i]' OR "; 
            }
            else if($i==count($chosen_ct_filters)-1)
            {
                $ct_args .= "file_data.response_content_types = '$chosen_ct_filters[$i]')"; 
            }
        }
    }

    if(empty($chosen_dotw_filters) || $chosen_dotw_filters[0]=="All Days")
    {
            $dotw_args = "WEEKDAY(file_data.started_date_times) IS NOT NULL"; 
    }
    else if($chosen_dotw_filters[0]!="All Days" && count($chosen_dotw_filters)==1)
    {
        $day=date('N', strtotime($chosen_dotw_filters[0]))-1;
        $dotw_args = "WEEKDAY(file_data.started_date_times) = $day";
    }
    else if($chosen_dotw_filters[0]!="All Days" && count($chosen_dotw_filters)>1)
    {
        for($i=0;$i<count($chosen_dotw_filters);$i++)
        {
            if($i==0)
            {
                $day=date('N', strtotime($chosen_dotw_filters[$i]))-1;
                $dotw_args = "(WEEKDAY(file_data.started_date_times) = $day OR "; 
            }
            if($i>0 && $i<count($chosen_dotw_filters)-1)
            {
                $day=date('N', strtotime($chosen_dotw_filters[$i]))-1;
                $dotw_args .= "WEEKDAY(file_data.started_date_times) = $day OR "; 
            }
            else if($i==count($chosen_dotw_filters)-1)
            {
                $day=date('N', strtotime($chosen_dotw_filters[$i]))-1;
                $dotw_args .= "WEEKDAY(file_data.started_date_times) = $day)"; 
            }
        }
    }

    if(empty($chosen_http_filters) || $chosen_http_filters[0]=="All HTTP Methods")
    {
            $http_args = "file_data.request_methods IS NOT NULL"; 
    }
    else if($chosen_http_filters[0]!="All HTTP Methods" && count($chosen_http_filters)==1)
    {
        $http_args = "file_data.request_methods = '$chosen_http_filters[0]'";
    }
    else if($chosen_http_filters[0]!="All HTTP Methods" && count($chosen_http_filters)>1)
    {
        for($i=0;$i<count($chosen_http_filters);$i++)
        {
            if($i==0)
            {
                $http_args = "(file_data.request_methods = '$chosen_http_filters[$i]' OR "; 
            }
            if($i>0 && $i<count($chosen_http_filters)-1)
            {
                $http_args .= "file_data.request_methods = '$chosen_http_filters[$i]' OR "; 
            }
            else if($i==count($chosen_http_filters)-1)
            {
                $http_args .= "file_data.request_methods = '$chosen_http_filters[$i]')"; 
            }
        }
    }

    if(empty($chosen_isp_filters) || $chosen_isp_filters[0]=="All ISPs")
    {
            $isp_args = "user_files.isp IS NOT NULL"; 
    }
    else if($chosen_isp_filters[0]!="All ISPs" && count($chosen_isp_filters)==1)
    {
        $isp_args = "user_files.isp = '$chosen_isp_filters[0]'";
    }
    else if($chosen_isp_filters[0]!="All ISPs" && count($chosen_isp_filters)>1)
    {
        for($i=0;$i<count($chosen_isp_filters);$i++)
        {
            if($i==0)
            {
                $isp_args = "(user_files.isp = '$chosen_isp_filters[$i]' OR "; 
            }
            if($i>0 && $i<count($chosen_isp_filters)-1)
            {
                $isp_args .= "user_files.isp = '$chosen_isp_filters[$i]' OR "; 
            }
            else if($i==count($chosen_isp_filters)-1)
            {
                $isp_args .= "user_files.isp = '$chosen_isp_filters[$i]')"; 
            }
        }
    }

    /*for($i = 0; $i < 24; $i++)
    {   
        $first_date = date("$i:00:00");
        $second_date = date("$i:59:59");
        array_push($first_date_array,$first_date);
        array_push($second_date_array,$second_date);
    }

    for($i = 0; $i < count($isps_array); $i++)
    {
        for($j = 0; $j < 24; $j++)
        {
            $sql="SELECT AVG(file_data.timings_wait) as avg_time FROM file_data 
            INNER JOIN user_files ON file_data.file_number=user_files.file_number 
            WHERE cast(file_data.started_date_times as time) 
            BETWEEN '$first_date_array[$j]' AND '$second_date_array[$j]' AND user_files.isp='$isps_array[$i]'";
            $result = mysqli_query($conn, $sql);
            if($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($avg_time,$row["avg_time"]);
                }
            }
        }
        if($i<count($isps_array)-1)
        {
            array_push($avg_time,"+");
        }
    }*/
    $e_str="!SELECT AVG(file_data.timings_wait) as avg_time FROM file_data 
            INNER JOIN user_files ON file_data.file_number=user_files.file_number 
            WHERE cast(file_data.started_date_times as time) 
            BETWEEN 'time1' AND 'time2' AND $ct_args AND $dotw_args AND $http_args AND $isp_args ALSO $day";
    echo $e_str;
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