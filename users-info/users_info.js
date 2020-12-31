"use strict";

//To set active button.
const room = document.querySelector(".side_nav");
const btns = document.querySelectorAll(".nav_btn");

room.addEventListener("click", (e) => {
  btns.forEach((btn) => {
    if (btn.getAttribute("id") === e.target.getAttribute("id")) btn.classList.add("active");
    else btn.classList.remove("active");
  });
});

let coordinates = [2];
function set_coordinates() {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const [latitude, longitude] = this.responseText.split("+");
        coordinates[0] = parseFloat(latitude);
        coordinates[1] = parseFloat(longitude);
        resolve();
      }
    };
    xhttp.open("POST", "map.php?q=", true);
    xhttp.send();
  });
}

function NumberOfUsers() {
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let sm = document.getElementById("map");
  nou.style.display = "block";
  rms.style.display = "none";
  rss.style.display = "none";
  sm.style.display = "none";
  $.ajax({
    type: "POST",
    url: "collect_data.php",
    data: {
      request: "number_of_users",
    },
    success: function (res) {
      document.getElementById("number_of_users").innerHTML = res;
    },
  });
}

function RequestMethodStatistics() {
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "block";
  rss.style.display = "none";
  sm.style.display = "none";
}

function ResponseStatusStatistics() {
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "block";
  sm.style.display = "none";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const [last_upload, total_entries] = this.responseText.split("+");
      document.getElementById("last_upload").innerHTML = last_upload;
      document.getElementById("total_entries").innerHTML = total_entries;
    }
  };
  xhttp.open("POST", "statistics.php?q=", true);
  xhttp.send();
}

function showMap() {
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "none";
  sm.style.display = "block";
  sm.style.visibility = "visible";
}

// Creating map options
async function make_map() {
  await set_coordinates();
  // Creating a map object
  var map = new L.map("map", { center: [coordinates[0], coordinates[1]], zoom: 10 });

  // Creating a Layer object
  var layer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

  // Adding layer to the map
  map.addLayer(layer);

  let testData = {
    max: 8,
    data: [
      { lat: 38.246242, lng: 21.735085, count: 3 },
      { lat: 38.323343, lng: 21.865082, count: 2 },
      { lat: 38.34381, lng: 21.57074, count: 8 },
      { lat: 38.108628, lng: 21.502075, count: 7 },
      { lat: 38.123034, lng: 21.917725, count: 4 },
    ],
  };
  let cfg = {
    radius: 40,
    maxOpacity: 0.8,
    scaleRadius: false,
    useLocalExtrema: false,
    latField: "lat",
    lngField: "lng",
    valueField: "count",
  };
  let heatmapLayer = new HeatmapOverlay(cfg);
  map.addLayer(heatmapLayer);
  heatmapLayer.setData(testData);
}

make_map();
