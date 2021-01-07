<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: ../login/login.php");
    exit;
}
if(isset($_SESSION["role"]) && $_SESSION["role"]!="admin")
{
    header("location: ../welcome.php");
}

// Include config file
require_once "../config.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reset Username</title>
    <link rel="stylesheet" type="text/css" href="../style.css">
    <link rel="stylesheet" type="text/css" href="../user-profile/user_profile.css">
    <link rel="stylesheet" type="text/css" href="./users_info.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel = "stylesheet" href = "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"/>
    <script src = "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
    <script src = "https://cdn.jsdelivr.net/npm/heatmapjs@2.0.2/heatmap.js"></script>
    <script src = "https://cdn.jsdelivr.net/npm/leaflet-heatmap@1.0.0/leaflet-heatmap.js"></script>
    <script src = "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script> 
    <script src = " https://cdnjs.cloudflare.com/ajax/libs/google-palette/1.1.0/palette.js"></script>
</head>
<style>

p{
    font-weight: normal;
}

.form-group{
    padding:1%;
}

.menu-space{
    padding:10%;
}

</style>
<body>
    <div id="content">
        <img class="resize" src="../images/logo-header.png" alt="Logo"/>
            <br style="clear:both">
            <div class="topnav">
                <a href="http://localhost/project/welcome.php">Home</a>
                <a href="http://localhost/project/user-profile/user_profile.php">User Profile</a>
                <a class="active" href="http://localhost/project/users-info/users_info.php">Users Info</a>
                <a href="http://localhost/project/logout.php">Logout</a>
            </div>
        <hr class="solid"/>
            <div class="side_nav">
                <button class="nav_btn" id="nu" onclick="NumberOfUsers()">Number of Users</button>
                <button class="nav_btn" id="rms" onclick="RequestMethodStatistics()">Request Method Statistics</button>
                <button class="nav_btn" id="rss" onclick="ResponseStatusStatistics()">Response Status Statistics</button>
                <button class="nav_btn" id="ud" onclick="UniqueDomains()">Unique Domains</button>
                <button class="nav_btn" id="isp" onclick="ISPs()">ISPs</button>
                <button class="nav_btn" id="aa" onclick="AverageAgeOfContent()">Average Age of Content-Types</button>
                <button class="nav_btn" id="rta" onclick="ResponseTimeAnalysis()">Response Time Analysis</button>
                <button class="nav_btn" id="sm" onclick="showMap()">Show Map</button>
            </div>
        <div class="flex-container">
            <div id = "map" style = "width: 850px; height: 470px"></div>
            <div id="NumberOfUsers">
                <div class="menu-space"></div>
                <table id="content-table">
                    <thead>
                        <tr> 
                            <th>Number of Registered Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="number_of_users"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="RequestMethodStatistics">
                <table id="content-table">
                    <thead>
                        <tr> 
                            <th>Method Type</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>POST</td>
                            <td id="nop"></td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td id="nog"></td>
                        </tr>
                        <tr>
                            <td>HEAD</td>
                            <td id="noh"></td>
                        </tr>
                        <tr>
                            <td>PUT</td>
                            <td id="nopu"></td>
                        </tr>
                        <tr>
                            <td>DELETE</td>
                            <td id="nod"></td>
                        </tr>
                        <tr>
                            <td>CONNECT</td>
                            <td id="noc"></td>
                        </tr>
                        <tr>
                            <td>OPTIONS</td>
                            <td id="noo"></td>
                        </tr>
                        <tr>
                            <td>TRACE</td>
                            <td id="notr"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="ResponseStatusStatistics">
                <div class="menu-space"></div>
                <table id="content-table">
                    <thead>
                        <tr> 
                            <th>Response Status</th>
                            <th>Occurrences</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select id="selectStatus">
                                    <option>Choose Response Status</option>
                                </select>
                            </td>
                            <td id="occur"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="UniqueDomains">
                <div class="menu-space"></div>
                <table id="content-table">
                    <thead>
                        <tr> 
                            <th>Number of Unique Domains</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td id="noud"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="ISPs">
                <div class="menu-space"></div>
                <table id="content-table">
                    <thead>
                        <tr> 
                            <th>Number of Unique ISPs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td id="noisp"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="AverageAgeOfContent">
                <div class="menu-space"></div>
                <table id="content-table">
                    <thead>
                        <tr> 
                            <th>Content-Type</th>
                            <th>Average Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select id="selectContentType">
                                    <option>Choose Content-Type</option>
                                </select>
                            </td>
                            <td id="aaoc"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id = "ResponseTimeAnalysis">
                <select id="selectChartType">
                    <option>Response Time Analysis by Hour</option>
                </select>
                <canvas id = "rtaChart" width="700" height="400"></canvas>
            </div>
        </div>
    </div>
    <div id="loader">Loading...</div>
    <script src="users_info.js"></script>
</body>
</html>    


