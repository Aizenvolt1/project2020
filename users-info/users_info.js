"use strict";

//To set active button.
const room = document.querySelector(".side_nav");
const btns = document.querySelectorAll(".nav_btn");
let select;
let options = [];
let opt;
let el = [];
let hasChild = false;

room.addEventListener("click", (e) => {
  btns.forEach((btn) => {
    if (btn.getAttribute("id") === e.target.getAttribute("id")) btn.classList.add("active");
    else btn.classList.remove("active");
  });
});

const selectElement = document.querySelector("#selectStatus");

selectElement.addEventListener("change", (event) => {
  if (event.target.value === "Choose Response Status") {
    document.getElementById("occur").innerHTML = "-";
  } else {
    $.ajax({
      type: "POST",
      url: "collect_data.php",
      data: {
        request: "request_number_of_response_statuses",
        request_type: "value",
        value_name: event.target.value,
      },
      success: function (res) {
        document.getElementById("occur").innerHTML = res;
      },
    });
  }
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
  if (hasChild === true) {
    for (let i = 0; i < options.length; i++) {
      select.removeChild(el[i]);
    }
    hasChild = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let sm = document.getElementById("map");
  nou.style.display = "block";
  rms.style.display = "none";
  rss.style.display = "none";
  ud.style.display = "none";
  isp.style.display = "none";
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
  if (hasChild === true) {
    for (let i = 0; i < options.length; i++) {
      select.removeChild(el[i]);
    }
    hasChild = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "block";
  rss.style.display = "none";
  ud.style.display = "none";
  isp.style.display = "none";
  sm.style.display = "none";

  $.ajax({
    type: "POST",
    url: "collect_data.php",
    data: {
      request: "request_method_statistics",
    },
    success: function (res) {
      const [nop, nog, noh, nopu, nod, noc, noo, notr] = res.split("+");
      document.getElementById("nop").innerHTML = nop;
      document.getElementById("nog").innerHTML = nog;
      document.getElementById("noh").innerHTML = noh;
      document.getElementById("nopu").innerHTML = nopu;
      document.getElementById("nod").innerHTML = nod;
      document.getElementById("noc").innerHTML = noc;
      document.getElementById("noo").innerHTML = noo;
      document.getElementById("notr").innerHTML = notr;
    },
  });
}

function ResponseStatusStatistics() {
  document.getElementById("occur").innerHTML = "-";
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "block";
  ud.style.display = "none";
  isp.style.display = "none";
  sm.style.display = "none";

  select = document.getElementById("selectStatus");

  $.ajax({
    type: "POST",
    url: "collect_data.php",
    data: {
      request: "request_number_of_response_statuses",
      request_type: "element",
    },
    success: function (res) {
      options = JSON.parse(res);
      for (let i = 0; i < options.length; i++) {
        opt = options[i];
        el[i] = document.createElement("option");
        el[i].textContent = opt;
        el[i].value = opt;
        select.appendChild(el[i]);
      }
      hasChild = true;
    },
  });
}

function UniqueDomains() {
  if (hasChild === true) {
    for (let i = 0; i < options.length; i++) {
      select.removeChild(el[i]);
    }
    hasChild = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "none";
  ud.style.display = "block";
  isp.style.display = "none";
  sm.style.display = "none";

  $.ajax({
    type: "POST",
    url: "collect_data.php",
    data: {
      request: "request_number_of_unique_domains",
    },
    success: function (res) {
      document.getElementById("noud").innerHTML = res;
    },
  });
}

function ISPs() {
  if (hasChild === true) {
    for (let i = 0; i < options.length; i++) {
      select.removeChild(el[i]);
    }
    hasChild = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "none";
  ud.style.display = "none";
  isp.style.display = "block";
  sm.style.display = "none";

  $.ajax({
    type: "POST",
    url: "collect_data.php",
    data: {
      request: "request_number_of_unique_isps",
    },
    success: function (res) {
      document.getElementById("noisp").innerHTML = res;
    },
  });
}

function showMap() {
  if (hasChild === true) {
    for (let i = 0; i < options.length; i++) {
      select.removeChild(el[i]);
    }
    hasChild = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "none";
  ud.style.display = "none";
  isp.style.display = "none";
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
