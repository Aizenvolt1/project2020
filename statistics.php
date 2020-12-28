<?php
session_start();
require_once "config.php";

$sql = "SELECT max(upload_date) as last_upload, sum(entries) as total_entries FROM user_files WHERE user_id = $_SESSION[id]";

$result = mysqli_query($conn, $sql);
if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<table>";
        echo "<tr>";
        echo "<th>CustomerID</th>";
        echo "<td>" . $row["last_upload"] . "</td>";
        echo "<td>" . $row["total_entries"] . "</td>";

/*echo "<th>CompanyName</th>";
echo "<td>" . $cname . "</td>";
echo "<th>ContactName</th>";
echo "<td>" . $name . "</td>";
echo "<th>Address</th>";
echo "<td>" . $adr . "</td>";
echo "<th>City</th>";
echo "<td>" . $city . "</td>";
echo "<th>PostalCode</th>";
echo "<td>" . $pcode . "</td>";
echo "<th>Country</th>";
echo "<td>" . $country . "</td>";
echo "</tr>";
echo "</table>";*/
    }
}
else{
    echo "0 results";
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Welcome</title>
        <link rel="stylesheet" type="text/css" href="./style.css">
        <link rel="stylesheet" type="text/css" href="./statistics.css">
        <style type="text/css">
            body{ font: 14px sans-serif; text-align: center; }
        </style>
    </head>
    <body>
    <img class="resize" src="images/logo-header.png" alt="Logo"/>
        <br style="clear:both">
        <div class="topnav">
            <a href="http://localhost/project/welcome.php">Home</a>
            <a href="http://localhost/project/reset-username.php">Reset Your Username</a>
            <a href="http://localhost/project/reset-password.php">Reset Your Password</a>
            <a class="active" href="http://localhost/project/statistics.php">Statistics</a>
            <a href="http://localhost/project/logout.php">Logout</a>
        </div>
        <hr class="solid">
        <div class="menu-space"></div>
        <div class="menu-space"></div>
        <div class="menu-space"></div>
        <div class="page-header">
    <h2>Your statistics</h2>
<br>
        <script src="statistics.js"></script>
        <table class="content-table">
    <thead>
    <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Points</th>
        <th>Team</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td>Domenic</td>
        <td>88,110</td>
        <td>dcode</td>
    </tr>
    <tr class="active-row">
        <td>2</td>
        <td>Sally</td>
        <td>72,400</td>
        <td>Students</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Nick</td>
        <td>52,300</td>
        <td>dcode</td>
    </tr>
    </tbody>
</table>
    </body>
</html>