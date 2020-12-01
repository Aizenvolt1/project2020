<?php
$url=null;
$test=json_decode(file_get_contents("./extracted_zip_files/uploads_gamerwelfarecom_Archive [20-11-27 19-03-56].har"));

$startedDateTimes = array();
$serverIPAddress = array();
/*
foreach($test->log->entries as $row)
{
  array_push($startedDateTimes,$row->startedDateTime);
}

foreach($startedDateTimes as $row)
{
  echo $row . "<br>";
}*/

foreach($test->log->entries as $row)
{
  if(isset($row->serverIPAddress))
  {
    array_push($serverIPAddress,$row->serverIPAddress);
    echo $row->serverIPAddress;
  }
  else
  {
    array_push($serverIPAddress,null);
  }
}
/*
foreach($serverIPAddress as $row)
{
  echo $row;
}
*/



/*
foreach($test->log->entries as $row)
{
echo $row->timings->wait . "<br>";
}



foreach($test->log->entries as $row)
{
echo $row->request->method . "<br>";
}

foreach($test->log->entries as $row)
{
  preg_match('@^(?:http://|https://)?([^/]+)@i',$row->request->url, $matches);
  echo $matches[0] . "<br>";
}

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
    if($srow->name==="content-type")
    {
      echo $srow->value . "<br>";
    }
  }
}

foreach($test->log->entries as $row)
{
  foreach($row->response->headers as $srow)
  {
    if($srow->name==="cache-control")
    {
      echo $srow->value . "<br>";
    }
  }
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
}
*/