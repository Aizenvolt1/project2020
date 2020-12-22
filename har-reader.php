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

print_r($startedDateTimes);
print_r($serverIPAddresses);
$data = array();
$a = 0;
$b = "uploads_";
$d="";
$counter = 0;
$sql = "INSERT INTO user_files (user_id) VALUES (?)";
if ($stmt = mysqli_prepare($conn, $sql)){
  // Bind variables to the prepared statement as parameters
  mysqli_stmt_bind_param($stmt, "i", $param_userID);
  $param_userID = $_SESSION["id"];
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
  foreach($startedDateTimes as $i)
  {
    $a++;
    $sql = "INSERT INTO started_date_times (NumberOfEntry, entr, file_number) VALUES ('$a','$i', '$[fileNum]')"; 
    if ($conn->query($sql) === TRUE) {
      echo "";
    } else {
      echo "Error updating record: " . $conn->error;
    }
  }
}
$a=0;

$reloader="yes";
if(isset($_POST['reload']) && !empty($_POST['reload'])) {
echo json_encode(array("reloading"=>$reloader));
}