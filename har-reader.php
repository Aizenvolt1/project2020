<?php
session_start();
require_once "config.php";
$url=null;

$startedDateTimes = json_decode($_POST['startedDateTimes'],true);
$timings_wait = json_decode($_POST['timings_wait'],true);
$serverIPAddresses = json_decode($_POST['serverIPAddresses'],true);
$request_method = json_decode($_POST['request_method'],true);
$request_url = json_decode($_POST['request_url'],true);
$request_content_type = json_decode($_POST['request_content_type'],true);
$request_cache_control = json_decode($_POST['request_cache_control'],true);
$request_pragma = json_decode($_POST['request_pragma'],true);
$request_expires = json_decode($_POST['request_expires'],true);
$request_age = json_decode($_POST['request_age'],true);
$request_last_modified = json_decode($_POST['request_last_modified'],true);
$request_host = json_decode($_POST['request_host'],true);
$response_status = json_decode($_POST['response_status'],true);
$response_statusText = json_decode($_POST['response_statusText'],true);
$response_content_type = json_decode($_POST['response_content_type'],true);
$response_cache_control = json_decode($_POST['response_cache_control'],true);
$response_pragma = json_decode($_POST['response_pragma'],true);
$response_expires = json_decode($_POST['response_expires'],true);
$response_age = json_decode($_POST['response_age'],true);
$response_last_modified = json_decode($_POST['response_last_modified'],true);
$response_host = json_decode($_POST['response_host'],true);
$filenames = json_decode($_POST['filenames'],true);
$latitude = json_decode($_POST['latitude'],true);
$longitude = json_decode($_POST['longitude'],true);
$isp = json_decode($_POST['isp'],true);
$ip = json_decode($_POST['ip'],true);
$city = json_decode($_POST['city'],true);


for($i=0;$i<count($startedDateTimes);$i++)
{
  $file_number[$i]=0;
}
$mergedData = array();
for($i=0;$i<count($startedDateTimes);$i++)
{
$mergedData[$i]=array($file_number[$i], $startedDateTimes[$i],$timings_wait[$i], $serverIPAddresses[$i],$request_method[$i],$request_url[0][$i],$request_content_type[$i], 
$request_cache_control[$i],$request_pragma[$i],$request_expires[$i],$request_age[$i],
$request_last_modified[$i],$request_host[$i],$response_status[$i]
,$response_statusText[$i],$response_content_type[$i],
$response_cache_control[$i],$response_pragma[$i], $response_expires[$i], $response_age[$i]
, $response_last_modified[$i],$response_host[$i]);
}
for($i=0;$i<count($mergedData);$i++)
{
  if($i==0)
  {
    $args = "('" . implode("','", $mergedData[$i]) . "'),"; 
  }
  else if($i==count($mergedData)-1)
  {
    $args .= "('" . implode("','", $mergedData[$i]) . "')"; 
  }
  else {
    {
      $args .= "('" . implode("','", $mergedData[$i]) . "'),"; 
    }
  }
}
/*print_r($latitude[0]) . "<br><br><br>";
print_r($longitude[0]) . "<br><br><br>";
print_r($isp[0]) . "<br><br><br>";
print_r($ip[0]) . "<br><br><br>";
print_r($city[0]);*/
$data = array();
$a;
$b = "uploads_";
$d="";
$counter = 0;
$sql = "INSERT INTO user_files (user_id, upload_date, latitude, longitude, isp, ip, city, entries) VALUES (?, now(), ?, ?, ?, ?, ?, ?)";
if ($stmt = mysqli_prepare($conn, $sql)){
  // Bind variables to the prepared statement as parameters
  mysqli_stmt_bind_param($stmt, "iddsssi", $param_userID, $param_latitude, $param_longitude, $param_isp, $param_ip, $param_city, $param_entries);
  $param_userID = $_SESSION["id"];
  $param_latitude = $latitude[0];
  $param_longitude = $longitude[0];
  $param_isp = $isp[0];
  $param_ip = $ip[0];
  $param_city = $city[0];
  $param_entries = count($startedDateTimes);
  // Attempt to execute the prepared statement
  if (mysqli_stmt_execute($stmt)){
  } else {
    echo "Something went wrong. Please try again later.";
  }
  // Close statement
  mysqli_stmt_close($stmt);
}

$sql = "SELECT MAX(file_number) as fileNum FROM user_files WHERE user_id=$_SESSION[id]";
$result = mysqli_query($conn, $sql);
      //Entries: StartedDateTimes
      while($row = mysqli_fetch_assoc($result))
      {
        $a++;
        $sql = "INSERT INTO file_data (file_number, started_date_times, timings_wait, server_ip_addresses, request_methods, 
        request_urls, request_content_types, request_cache_controls, request_pragmas, request_expires, request_ages, 
        request_last_modified, request_hosts, response_statuses, response_status_texts, response_content_types, 
        response_cache_controls, response_pragmas, response_expires, response_ages, response_last_modified, 
        response_hosts) VALUES $args"; 
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }
        
        $sql = "UPDATE file_data SET file_number = $row[fileNum] WHERE file_number = 0";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET timings_wait = NULL WHERE  timings_wait = 0";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET  server_ip_addresses = NULL WHERE server_ip_addresses = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET request_methods = NULL WHERE request_methods = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET request_urls = NULL WHERE request_urls = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET request_content_types = NULL WHERE  request_content_types = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET request_cache_controls = NULL WHERE  request_cache_controls = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET request_pragmas = NULL WHERE  request_pragmas = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET request_expires = NULL WHERE  request_expires = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET request_ages = NULL WHERE  request_ages = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET request_last_modified = NULL WHERE  request_last_modified = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET request_hosts = NULL WHERE  request_hosts = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET response_statuses = NULL WHERE  response_statuses = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET response_status_texts = NULL WHERE  response_status_texts = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET response_content_types = NULL WHERE  response_content_types = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET response_cache_controls = NULL WHERE  response_cache_controls = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET response_pragmas = NULL WHERE  response_pragmas = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET response_expires = NULL WHERE  response_expires = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET response_ages = NULL WHERE  response_ages = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET response_last_modified = NULL WHERE  response_last_modified = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }

        $sql = "UPDATE file_data SET response_hosts = NULL WHERE  response_hosts = ''";
        if ($conn->query($sql) === TRUE) {
          echo "";
        } else {
          echo "Error updating record: " . $conn->error;
        }
      }

$reloader="yes";
if(isset($_POST['reload']) && !empty($_POST['reload'])) {
if(isset($_POST['reloads']) && !empty($_POST['reloads'])) {
echo json_encode(array("reloading"=>$reloader));
} 
}