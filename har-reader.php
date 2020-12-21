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
$a;
$b = "uploads_";
$d="";
$counter = 0;
$sql = "INSERT INTO user_files (user_id) VALUES (?)";
if ($stmt = mysqli_prepare($conn, $sql)){
  // Bind variables to the prepared statement as parameters
  mysqli_stmt_bind_param($stmt, "i", $param_userID);
  $param_userID = $_SESSION[id];
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
          $sql = "INSERT INTO started_date_times (NumberOfEntry, entr, file_number) VALUES ('$a','$i', '$row[fileNum]')"; 
          if ($conn->query($sql) === TRUE) {
            echo "";
          } else {
            echo "Error updating record: " . $conn->error;
          }
        }
      }
      $a=0;
      //Entries: serverIPAddress
      while($row = mysqli_fetch_assoc($result))
      {
      foreach($serverIPAddresses as $i)
      {
          $a++;
          $sql = "INSERT INTO server_ip_address (NumberOfEntry, entr, file_number) VALUES ('$a','$i', '$row[fileNum]')"; 
          if ($conn->query($sql) === TRUE) {
            echo "";
          } else {
            echo "Error updating record: " . $conn->error;
          }
        }
      }
      $a=0;
      //Entries: timing
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        if (isset($i->data->wait)){
          array_push($data,$i->data->wait);
        }
        else{
          array_push($data,null);
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: methods
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        if (isset($i->request->method)){
          array_push($data,$i->request->method);
        }
        else{
          array_push($data,null);
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: url
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        if (isset($i->request->url)){
          preg_match('@^(?:http://|https://)?([^/]+)@i',$i->request->url, $matches);
          $c = $matches[0];
          array_push($data,$c);
        }
        else{
          array_push($data,null);
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: headers: content_type
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->request->headers as $k)
        {
          if($k->name==="Content-Type")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: headers: cache-control
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->request->headers as $k)
        {
          if($k->name==="Cache-Control")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: headers: pragma
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->request->headers as $k)
        {
          if($k->name==="pragma" || $k->name==="Pragma")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: headers: expires
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->request->headers as $k)
        {
          if($k->name==="expires" || $k->name==="Expires")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: headers: age
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->request->headers as $k)
        {
          if($k->name==="age" || $k->name==="Age")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: headers: last-modified
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->request->headers as $k)
        {
          if($k->name==="last-modified" || $k->name==="Last-modified")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: headers: host
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->request->headers as $k)
        {
          if($k->name==="host" || $k->name==="Host")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Response: status
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        if (isset($i->response->status)){
          array_push($data,$i->response->status);
        }
        else{
          array_push($data,null);
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Response: statusText
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        if (isset($i->response->statusText)){
          array_push($data,$i->response->statusText);
        }
        else{
          array_push($data,null);
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //response: headers: content_type
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->response->headers as $k)
        {
          if($k->name==="Content-Type")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //response: headers: cache-control
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->response->headers as $k)
        {
          if($k->name==="Cache-Control")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //response: headers: pragma
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->response->headers as $k)
        {
          if($k->name==="pragma" || $k->name==="Pragma")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //response: headers: expires
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->response->headers as $k)
        {
          if($k->name==="expires" || $k->name==="Expires")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //response: headers: age
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->response->headers as $k)
        {
          if($k->name==="age" || $k->name==="Age")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //response: headers: last-modified
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->response->headers as $k)
        {
          if($k->name==="last-modified" || $k->name==="Last-modified")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //response: headers: host
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->response->headers as $k)
        {
          if($k->name==="host" || $k->name==="Host")
          {
            if (isset($k->value)){
              array_push($data,$k->value);
            }
            else{
              array_push($data,null);
            }
          }
        }
      }
      foreach($data as $i){
        //echo $row["file_name"] . " " . $i . "<br>";
      }