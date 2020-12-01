  
<?php
session_start();
require_once "config.php";

$url=null;
$startedDateTimes = array();
$serverIPAddresses = array();
$timings = array();
$requestMethods = array();
$urls = array();
$requestHeaders_contentType = array();
$requestHeaders_cacheControl = array();
$requestHeaders_pragma = array();
$b = "uploads_";
$sql = "SELECT * FROM user_files WHERE user_id=1";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
  while($row = mysqli_fetch_assoc($result)) {
    if ($row["file_checked"] !== 1){
      $a = "";
      $a = $b . $row["file_name"];
      $c = "";
      $test=json_decode(file_get_contents($a));

      unset($startedDateTimes);
      $startedDateTimes = array();
      //Entries: StartedDateTimes
      foreach($test->log->entries as $i)
      {
        if (isset($i->startedDateTimes)){
          array_push($startedDateTimes,$i->startedDateTime);
        }
        else{
          array_push($startedDateTimes,null);
        }
      }
      foreach($startedDateTimes as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Entries: serverIPAddress
      unset($serverIPAddresses);
      $serverIPAddresses = array();
      foreach($test->log->entries as $i)
      {
        if (isset($i->serverIPAddress)){
          array_push($serverIPAddresses,$i->serverIPAddress);
        }
        else{
          array_push($serverIPAddresses,null);
        }
      }
      foreach($serverIPAddresses as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Entries: timings
      unset($timings);
      $timings = array();
      foreach($test->log->entries as $i)
      {
        if (isset($i->timings->wait)){
          array_push($timings,$i->timings->wait);
        }
        else{
          array_push($timings,null);
        }
      }
      foreach($timings as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: methods
      unset($requestMethods);
      $requestMethods = array();
      foreach($test->log->entries as $i)
      {
        if (isset($i->request->method)){
          array_push($requestMethods,$i->request->method);
        }
        else{
          array_push($requestMethods,null);
        }
      }
      foreach($requestMethods as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: urls
      unset($urls);
      $urls = array();
      foreach($test->log->entries as $i)
      {
        if (isset($i->request->url)){
          preg_match('@^(?:http://|https://)?([^/]+)@i',$i->request->url, $matches);
          $c = $matches[0];
          array_push($urls,$c);
        }
        else{
          array_push($urls,null);
        }
      }
      foreach($urls as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: headers: content_type
      unset($requestHeaders_contentType);
      $requestHeaders_contentType = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->request->headers as $k)
        {
          if($k->name==="Content-Type")
          {
            if (isset($k->value)){
              array_push($requestHeaders_contentType,$k->value);
            }
            else{
              array_push($requestHeaders_contentType,null);
            }
          }
        }
      }
      foreach($requestHeaders_contentType as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: headers: cache-control
      unset($requestHeaders_cacheControl);
      $requestHeaders_cacheControl = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->request->headers as $k)
        {
          if($k->name==="Cache-Control")
          {
            if (isset($k->value)){
              array_push($requestHeaders_cacheControl,$k->value);
            }
            else{
              array_push($requestHeaders_cacheControl,null);
            }
          }
        }
      }
      foreach($requestHeaders_cacheControl as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Request: headers: pragma
      unset($requestHeaders_pragma);
      $requestHeaders_pragma = array();
      foreach($test->log->entries as $i)
      {
        foreach($i->request->headers as $k)
        {
          if($k->name==="pragma" || $k->name==="Pragma")
          {
            if (isset($k->value)){
              array_push($requestHeaders_pragma,$k->value);
            }
            else{
              array_push($requestHeaders_pragma,null);
            }
          }
        }
      }
      foreach($requestHeaders_pragma as $i)
      {
        echo $row["file_name"] . " " . $i . "<br>";
      }
    } 
  }
} else {
  echo "0 results";
}
/*
foreach($test->log->entries as $row)
{
echo $row->response->status . "<br>";
}
foreach($test->log->entries as $row)
{
echo $row->response->statusText . "<br>";
}
foreach($test->log->entries as $row)
{
  foreach($row->response->headers as $srow)
  {
    if($srow->name==="pragma")
    {
      echo $srow->value . "<br>";
    }
  }
}
foreach($test->log->entries as $row)
{
  foreach($row->response->headers as $srow)
  {
    if($srow->name==="expires")
    {
      echo $srow->value . "<br>";
    }
  }
}
foreach($test->log->entries as $row)
{
  foreach($row->response->headers as $srow)
  {
    if($srow->name==="age")
    {
      echo $srow->value . "<br>";
    }
  }
}
foreach($test->log->entries as $row)
{
  foreach($row->response->headers as $srow)
  {
    if($srow->name==="last-modified")
    {
      echo $srow->value . "<br>";
    }
  }
}
foreach($test->log->entries as $row)
{
  foreach($row->response->headers as $srow)
  {
    if($srow->name==="host")
    {
      echo $srow->value . "<br>";
    }
  }
}*/