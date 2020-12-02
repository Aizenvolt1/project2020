<?php
session_start();
require_once "config.php";

$url=null;
$data = array();
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

      unset($data);
      $data = array();
      //Entries: StartedDateTimes
      foreach($test->log->entries as $i)
      {
        if (isset($i->data)){
          array_push($data,$i->startedDateTime);
        }
        else{
          array_push($data,null);
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

      //Entries: serverIPAddress
      unset($data);
      $data = array();
      foreach($test->log->entries as $i)
      {
        if (isset($i->serverIPAddress)){
          array_push($data,$i->serverIPAddress);
        }
        else{
          array_push($data,null);
        }
      }
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
      }

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
        echo $row["file_name"] . " " . $i . "<br>";
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
      foreach($data as $i)
      {
        //echo $row["file_name"] . " " . $i . "<br>";
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