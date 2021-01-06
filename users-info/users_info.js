"use strict";

//To set active button.
const room = document.querySelector(".side_nav");
const btns = document.querySelectorAll(".nav_btn");
let select_status;
let select_content;
let options_status = [];
let options_content = [];
let opt_status;
let opt_content;
let el_status = [];
let el_content = [];
let hasChild_status = false;
let hasChild_content = false;
let color_array = [];
palette("tol-sq", 12).map(function (hex) {
  color_array.push("#" + hex);
});
palette("tol", 12).map(function (hex) {
  color_array.push("#" + hex);
});

//This is for active css color for Side Menu
room.addEventListener("click", (e) => {
  btns.forEach((btn) => {
    if (btn.getAttribute("id") === e.target.getAttribute("id")) btn.classList.add("active");
    else btn.classList.remove("active");
  });
});

//Setting starting map coordinates
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

//This functions runs when Number of Users is selected from Side Menu
function NumberOfUsers() {
  if (hasChild_status === true) {
    for (let i = 0; i < options_status.length; i++) {
      select_status.removeChild(el_status[i]);
    }
    hasChild_status = false;
  }
  if (hasChild_content === true) {
    for (let i = 0; i < options_content.length; i++) {
      select_content.removeChild(el_content[i]);
    }
    hasChild_content = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let aoc = document.getElementById("AverageAgeOfContent");
  let rta = document.getElementById("ResponseTimeAnalysis");
  let sm = document.getElementById("map");
  nou.style.display = "block";
  rms.style.display = "none";
  rss.style.display = "none";
  ud.style.display = "none";
  isp.style.display = "none";
  aoc.style.display = "none";
  rta.style.display = "none";
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

//This functions runs when Request Method Statistics is selected from Side Menu
function RequestMethodStatistics() {
  if (hasChild_status === true) {
    for (let i = 0; i < options_status.length; i++) {
      select_status.removeChild(el_status[i]);
    }
    hasChild_status = false;
  }
  if (hasChild_content === true) {
    for (let i = 0; i < options_content.length; i++) {
      select_content.removeChild(el_content[i]);
    }
    hasChild_content = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let aoc = document.getElementById("AverageAgeOfContent");
  let rta = document.getElementById("ResponseTimeAnalysis");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "block";
  rss.style.display = "none";
  ud.style.display = "none";
  isp.style.display = "none";
  aoc.style.display = "none";
  rta.style.display = "none";
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

//This functions runs when Response Status Statistics is selected from Side Menu
function ResponseStatusStatistics() {
  if (hasChild_content === true) {
    for (let i = 0; i < options_content.length; i++) {
      select_content.removeChild(el_content[i]);
    }
    hasChild_content = false;
  }
  document.getElementById("occur").innerHTML = "-";
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let aoc = document.getElementById("AverageAgeOfContent");
  let rta = document.getElementById("ResponseTimeAnalysis");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "block";
  ud.style.display = "none";
  isp.style.display = "none";
  aoc.style.display = "none";
  rta.style.display = "none";
  sm.style.display = "none";

  select_status = document.getElementById("selectStatus");

  $.ajax({
    type: "POST",
    url: "collect_data.php",
    data: {
      request: "request_number_of_response_statuses",
      request_type: "element",
    },
    success: function (res) {
      options_status = JSON.parse(res);
      for (let i = 0; i < options_status.length; i++) {
        opt_status = options_status[i];
        el_status[i] = document.createElement("option");
        el_status[i].textContent = opt_status;
        el_status[i].value = opt_status;
        select_status.appendChild(el_status[i]);
      }
      hasChild_status = true;
    },
  });
}

//This is for the drop down menu on Response Status Statistics
const selectElementStatus = document.querySelector("#selectStatus");

selectElementStatus.addEventListener("change", (event) => {
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

//This functions runs when Unique Domains is selected from Side Menu
function UniqueDomains() {
  if (hasChild_status === true) {
    for (let i = 0; i < options_status.length; i++) {
      select_status.removeChild(el_status[i]);
    }
    hasChild_status = false;
  }
  if (hasChild_content === true) {
    for (let i = 0; i < options_content.length; i++) {
      select_content.removeChild(el_content[i]);
    }
    hasChild_content = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let aoc = document.getElementById("AverageAgeOfContent");
  let rta = document.getElementById("ResponseTimeAnalysis");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "none";
  ud.style.display = "block";
  isp.style.display = "none";
  aoc.style.display = "none";
  rta.style.display = "none";
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

//This functions runs when ISPs is selected from Side Menu
function ISPs() {
  if (hasChild_status === true) {
    for (let i = 0; i < options_status.length; i++) {
      select_status.removeChild(el_status[i]);
    }
    hasChild_status = false;
  }
  if (hasChild_content === true) {
    for (let i = 0; i < options_content.length; i++) {
      select_content.removeChild(el_content[i]);
    }
    hasChild_content = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let aoc = document.getElementById("AverageAgeOfContent");
  let rta = document.getElementById("ResponseTimeAnalysis");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "none";
  ud.style.display = "none";
  isp.style.display = "block";
  aoc.style.display = "none";
  rta.style.display = "none";
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

//This functions runs when Average Age Of Content is selected from Side Menu
function AverageAgeOfContent() {
  if (hasChild_status === true) {
    for (let i = 0; i < options_status.length; i++) {
      select_status.removeChild(el_status[i]);
    }
    hasChild_status = false;
  }
  document.getElementById("aaoc").innerHTML = "-";
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let aoc = document.getElementById("AverageAgeOfContent");
  let rta = document.getElementById("ResponseTimeAnalysis");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "none";
  ud.style.display = "none";
  isp.style.display = "none";
  aoc.style.display = "block";
  rta.style.display = "none";
  sm.style.display = "none";

  select_content = document.getElementById("selectContentType");

  $.ajax({
    type: "POST",
    url: "collect_data.php",
    data: {
      request: "request_content_type_info",
      request_type: "content_type",
    },
    success: function (res) {
      options_content = JSON.parse(res);
      for (let i = 0; i < options_content.length; i++) {
        opt_content = options_content[i];
        el_content[i] = document.createElement("option");
        el_content[i].textContent = opt_content;
        el_content[i].value = opt_content;
        select_content.appendChild(el_content[i]);
      }
      hasChild_content = true;
    },
  });
}

//This is for the drop down menu on Average Age of Content
const selectElementContent = document.querySelector("#selectContentType");

selectElementContent.addEventListener("change", (event) => {
  if (event.target.value === "Choose Content-Type") {
    document.getElementById("aaoc").innerHTML = "-";
  } else {
    $.ajax({
      type: "POST",
      url: "collect_data.php",
      data: {
        request: "request_content_type_info",
        request_type: "average_age",
        value_name_content: event.target.value,
      },
      success: function (res) {
        document.getElementById("aaoc").innerHTML = res;
      },
    });
  }
});

function ResponseTimeAnalysis() {
  if (hasChild_status === true) {
    for (let i = 0; i < options_status.length; i++) {
      select_status.removeChild(el_status[i]);
    }
    hasChild_status = false;
  }
  if (hasChild_content === true) {
    for (let i = 0; i < options_content.length; i++) {
      select_content.removeChild(el_content[i]);
    }
    hasChild_content = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let aoc = document.getElementById("AverageAgeOfContent");
  let rta = document.getElementById("ResponseTimeAnalysis");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "none";
  ud.style.display = "none";
  isp.style.display = "none";
  aoc.style.display = "none";
  rta.style.display = "block";
  sm.style.display = "none";

  $.ajax({
    type: "POST",
    url: "collect_data.php",
    data: {
      request: "request_time_analysis",
    },
    success: function (res) {
      var ctx = document.getElementById("rtaChart").getContext("2d");
      var rtaChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "0:00",
            "1:00",
            "2:00",
            "3:00",
            "4:00",
            "5:00",
            "6:00",
            "7:00",
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
          ],
          datasets: [
            {
              label: "Response Time Analysis",
              data: JSON.parse(res),
              backgroundColor: color_array,
              borderColor: color_array,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
  });
}

//This functions runs when Show Map is selected from Side Menu
function showMap() {
  if (hasChild_status === true) {
    for (let i = 0; i < options_status.length; i++) {
      select_status.removeChild(el_status[i]);
    }
    hasChild_status = false;
  }
  if (hasChild_content === true) {
    for (let i = 0; i < options_content.length; i++) {
      select_content.removeChild(el_content[i]);
    }
    hasChild_content = false;
  }
  let nou = document.getElementById("NumberOfUsers");
  let rms = document.getElementById("RequestMethodStatistics");
  let rss = document.getElementById("ResponseStatusStatistics");
  let ud = document.getElementById("UniqueDomains");
  let isp = document.getElementById("ISPs");
  let aoc = document.getElementById("AverageAgeOfContent");
  let rta = document.getElementById("ResponseTimeAnalysis");
  let sm = document.getElementById("map");
  nou.style.display = "none";
  rms.style.display = "none";
  rss.style.display = "none";
  ud.style.display = "none";
  isp.style.display = "none";
  aoc.style.display = "none";
  rta.style.display = "none";
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

setTimeout(function () {
  let nor = document.getElementById("loader");
  nor.style.display = "none";
  var x = document.getElementById("content");
  x.style.visibility = "visible";
}, 1400);
