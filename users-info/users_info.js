"use strict";

//To set active button.
const room = document.querySelector(".side_nav");
const btns = document.querySelectorAll(".nav_btn");
let select_status;
let select_content;
let select_filter = [];
let options_status = [];
let options_content = [];
let options_filter = [];
let opt_status;
let opt_content;
let opt_filter = [];
let el_status = [];
let el_content = [];
let el_filter = [[], [], [], [], []];
let hasChild_status = false;
let hasChild_content = false;
let color_array = [];

var ctx = document.getElementById("rtaChart").getContext("2d");
var rtaChart;

var hac = document.getElementById("haChart").getContext("2d");
var haChart;

let chosen_ct_filters = [];
let chosen_dotw_filters = [];
let chosen_http_filters = [];
let chosen_isp_filters = [];
let chosen_ttl_ct_filters = [];
let chosen_ha_isp_filters = [];

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

//This function runs when Number of Users is selected from Side Menu
function NumberOfUsers() {
  if (document.getElementById("NumberOfUsers").style.display !== "block") {
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
    let hha = document.getElementById("HeaderAnalysis");
    let sm = document.getElementById("map");
    nou.style.display = "block";
    rms.style.display = "none";
    rss.style.display = "none";
    ud.style.display = "none";
    isp.style.display = "none";
    aoc.style.display = "none";
    rta.style.display = "none";
    hha.style.display = "none";
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
}

//This function runs when Request Method Statistics is selected from Side Menu
function RequestMethodStatistics() {
  if (document.getElementById("RequestMethodStatistics").style.display !== "block") {
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
    let hha = document.getElementById("HeaderAnalysis");
    let sm = document.getElementById("map");
    nou.style.display = "none";
    rms.style.display = "block";
    rss.style.display = "none";
    ud.style.display = "none";
    isp.style.display = "none";
    aoc.style.display = "none";
    rta.style.display = "none";
    hha.style.display = "none";
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
}

//This function runs when Response Status Statistics is selected from Side Menu
function ResponseStatusStatistics() {
  if (document.getElementById("ResponseStatusStatistics").style.display !== "block") {
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
    let hha = document.getElementById("HeaderAnalysis");
    let sm = document.getElementById("map");
    nou.style.display = "none";
    rms.style.display = "none";
    rss.style.display = "block";
    ud.style.display = "none";
    isp.style.display = "none";
    aoc.style.display = "none";
    rta.style.display = "none";
    hha.style.display = "none";
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

//This function runs when Unique Domains is selected from Side Menu
function UniqueDomains() {
  if (document.getElementById("UniqueDomains").style.display !== "block") {
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
    let hha = document.getElementById("HeaderAnalysis");
    let sm = document.getElementById("map");
    nou.style.display = "none";
    rms.style.display = "none";
    rss.style.display = "none";
    ud.style.display = "block";
    isp.style.display = "none";
    aoc.style.display = "none";
    rta.style.display = "none";
    hha.style.display = "none";
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
}

//This function runs when ISPs is selected from Side Menu
function ISPs() {
  if (document.getElementById("ISPs").style.display !== "block") {
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
    let hha = document.getElementById("HeaderAnalysis");
    let sm = document.getElementById("map");
    nou.style.display = "none";
    rms.style.display = "none";
    rss.style.display = "none";
    ud.style.display = "none";
    isp.style.display = "block";
    aoc.style.display = "none";
    rta.style.display = "none";
    hha.style.display = "none";
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
}

//This function runs when Average Age Of Content is selected from Side Menu
function AverageAgeOfContent() {
  if (document.getElementById("AverageAgeOfContent").style.display !== "block") {
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
    let hha = document.getElementById("HeaderAnalysis");
    let sm = document.getElementById("map");
    nou.style.display = "none";
    rms.style.display = "none";
    rss.style.display = "none";
    ud.style.display = "none";
    isp.style.display = "none";
    aoc.style.display = "block";
    rta.style.display = "none";
    hha.style.display = "none";
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
  if (document.getElementById("ResponseTimeAnalysis").style.display !== "block") {
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
    let hha = document.getElementById("HeaderAnalysis");
    let sm = document.getElementById("map");
    nou.style.display = "none";
    rms.style.display = "none";
    rss.style.display = "none";
    ud.style.display = "none";
    isp.style.display = "none";
    aoc.style.display = "none";
    rta.style.display = "block";
    hha.style.display = "none";
    sm.style.display = "none";
  }
}

let checkbox_filters = document.querySelectorAll("input[type='checkbox']");
for (let i = 0; i < checkbox_filters.length; i++) {
  checkbox_filters[i].addEventListener("click", display_check);
}

function display_check(event) {
  if (event.target.checked) {
    if (event.target.value === "Content-Type") {
      document.getElementById("ct-filter-wrapper").style.display = "block";
      select_filter[0] = document.getElementById("ct-filter");

      $.ajax({
        type: "POST",
        url: "collect_data.php",
        data: {
          request: "request_content_type_info",
          request_type: "content_type",
        },
        success: function (res) {
          options_filter[0] = [];
          options_filter[0] = JSON.parse(res);
          for (let i = 0; i < options_filter[0].length; i++) {
            opt_filter[0] = options_filter[0][i];
            el_filter[0].push(document.createElement("option"));
            el_filter[0][i].textContent = opt_filter[0];
            el_filter[0][i].value = opt_filter[0];
            select_filter[0].appendChild(el_filter[0][i]);
          }
          $("#ct-filter").multiSelect({
            afterSelect: function (values) {
              if (values[0] === "All Content-Types") {
                for (let i = 0; i < options_filter[0].length; i++) {
                  $("#ct-filter").multiSelect("deselect", options_filter[0][i]);
                }
                chosen_ct_filters = [];
                chosen_ct_filters.push(values[0]);
              }
              if (values[0] !== "All Content-Types") {
                $("#ct-filter").multiSelect("deselect", ["All Content-Types"]);
                if (chosen_ct_filters[0] === "All Content-Types") {
                  chosen_ct_filters.shift();
                }
                chosen_ct_filters.push(values[0]);
              }
              draw_chart("response_time_analysis");
            },
            afterDeselect: function (values) {
              for (let i = 0; i < chosen_ct_filters.length; i++) {
                if (values[0] === chosen_ct_filters[i]) {
                  chosen_ct_filters.splice(i, 1);
                }
              }
              draw_chart("response_time_analysis");
            },
          });
        },
      });
    } else if (event.target.value === "Day of the Week Chart") {
      document.getElementById("dotw-filter-wrapper").style.display = "block";
      $("#dotw-filter").multiSelect({
        afterSelect: function (values) {
          if (values[0] === "All Days") {
            $("#dotw-filter").multiSelect("deselect", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
            chosen_dotw_filters = [];
            chosen_dotw_filters.push(values[0]);
          }
          if (values[0] !== "All Days") {
            $("#dotw-filter").multiSelect("deselect", ["All Days"]);
            if (chosen_dotw_filters[0] === "All Days") {
              chosen_dotw_filters.shift();
            }
            chosen_dotw_filters.push(values[0]);
          }
          draw_chart("response_time_analysis");
        },
        afterDeselect: function (values) {
          for (let i = 0; i < chosen_dotw_filters.length; i++) {
            if (values[0] === chosen_dotw_filters[i]) {
              chosen_dotw_filters.splice(i, 1);
            }
          }
          draw_chart("response_time_analysis");
        },
      });
    } else if (event.target.value === "HTTP Method") {
      document.getElementById("http-filter-wrapper").style.display = "block";
      select_filter[1] = document.getElementById("http-filter");

      $.ajax({
        type: "POST",
        url: "collect_data.php",
        data: {
          request: "request_distinct_http_methods",
        },
        success: function (res) {
          options_filter[1] = [];
          options_filter[1] = JSON.parse(res);
          for (let i = 0; i < options_filter[1].length; i++) {
            opt_filter[1] = options_filter[1][i];
            el_filter[1].push(document.createElement("option"));
            el_filter[1][i].textContent = opt_filter[1];
            el_filter[1][i].value = opt_filter[1];
            select_filter[1].appendChild(el_filter[1][i]);
          }
          $("#http-filter").multiSelect({
            afterSelect: function (values) {
              if (values[0] === "All HTTP Methods") {
                for (let i = 0; i < options_filter[1].length; i++) {
                  $("#http-filter").multiSelect("deselect", options_filter[1][i]);
                }
                chosen_http_filters = [];
                chosen_http_filters.push(values[0]);
              }
              if (values[0] !== "All HTTP Methods") {
                $("#http-filter").multiSelect("deselect", ["All HTTP Methods"]);
                if (chosen_http_filters[0] === "All HTTP Methods") {
                  chosen_http_filters.shift();
                }
                chosen_http_filters.push(values[0]);
              }
              draw_chart("response_time_analysis");
            },
            afterDeselect: function (values) {
              for (let i = 0; i < chosen_http_filters.length; i++) {
                if (values[0] === chosen_http_filters[i]) {
                  chosen_http_filters.splice(i, 1);
                }
              }
              draw_chart("response_time_analysis");
            },
          });
        },
      });
    } else if (event.target.value === "ISP") {
      document.getElementById("isp-filter-wrapper").style.display = "block";
      select_filter[2] = document.getElementById("isp-filter");

      $.ajax({
        type: "POST",
        url: "collect_data.php",
        data: {
          request: "request_distinct_isps",
        },
        success: function (res) {
          options_filter[2] = [];
          options_filter[2] = JSON.parse(res);
          for (let i = 0; i < options_filter[2].length; i++) {
            opt_filter[2] = options_filter[2][i];
            el_filter[2].push(document.createElement("option"));
            el_filter[2][i].textContent = opt_filter[2];
            el_filter[2][i].value = opt_filter[2];
            select_filter[2].appendChild(el_filter[2][i]);
          }
          $("#isp-filter").multiSelect({
            afterSelect: function (values) {
              if (values[0] === "All ISPs") {
                for (let i = 0; i < options_filter[2].length; i++) {
                  $("#isp-filter").multiSelect("deselect", options_filter[2][i]);
                }
                chosen_isp_filters = [];
                chosen_isp_filters.push(values[0]);
              }
              if (values[0] !== "All ISPs") {
                $("#isp-filter").multiSelect("deselect", ["All ISPs"]);
                if (chosen_isp_filters[0] === "All ISPs") {
                  chosen_isp_filters.shift();
                }
                chosen_isp_filters.push(values[0]);
              }
              draw_chart("response_time_analysis");
            },
            afterDeselect: function (values) {
              for (let i = 0; i < chosen_isp_filters.length; i++) {
                if (values[0] === chosen_isp_filters[i]) {
                  chosen_isp_filters.splice(i, 1);
                }
              }
              draw_chart("response_time_analysis");
            },
          });
        },
      });
    } else if (event.target.value === "TTL Content-Type") {
      document.getElementById("ttl-ct-filter-wrapper").style.display = "block";
      select_filter[3] = document.getElementById("ttl-ct-filter");

      $.ajax({
        type: "POST",
        url: "collect_data.php",
        data: {
          request: "request_content_type_info",
          request_type: "content_type",
        },
        success: function (res) {
          options_filter[3] = [];
          options_filter[3] = JSON.parse(res);
          for (let i = 0; i < options_filter[3].length; i++) {
            opt_filter[3] = options_filter[3][i];
            el_filter[3].push(document.createElement("option"));
            el_filter[3][i].textContent = opt_filter[3];
            el_filter[3][i].value = opt_filter[3];
            select_filter[3].appendChild(el_filter[3][i]);
          }
          $("#ttl-ct-filter").multiSelect({
            afterSelect: function (values) {
              if (values[0] === "All Content-Types") {
                for (let i = 0; i < options_filter[3].length; i++) {
                  $("#ttl-ct-filter").multiSelect("deselect", options_filter[3][i]);
                }
                chosen_ttl_ct_filters = [];
                chosen_ttl_ct_filters.push(values[0]);
              }
              if (values[0] !== "All Content-Types") {
                $("#ttl-ct-filter").multiSelect("deselect", ["All Content-Types"]);
                if (chosen_ttl_ct_filters[0] === "All Content-Types") {
                  chosen_ttl_ct_filters.shift();
                }
                chosen_ttl_ct_filters.push(values[0]);
              }
              draw_chart("header_analysis_histogram");
            },
            afterDeselect: function (values) {
              for (let i = 0; i < chosen_ttl_ct_filters.length; i++) {
                if (values[0] === chosen_ttl_ct_filters[i]) {
                  chosen_ttl_ct_filters.splice(i, 1);
                }
              }
              draw_chart("header_analysis_histogram");
            },
          });
        },
      });
    } else if (event.target.value === "HA ISP") {
      document.getElementById("ha-isp-filter-wrapper").style.display = "block";
      select_filter[4] = document.getElementById("ha-isp-filter");

      $.ajax({
        type: "POST",
        url: "collect_data.php",
        data: {
          request: "request_distinct_isps",
        },
        success: function (res) {
          options_filter[4] = [];
          options_filter[4] = JSON.parse(res);
          for (let i = 0; i < options_filter[4].length; i++) {
            opt_filter[4] = options_filter[4][i];
            el_filter[4].push(document.createElement("option"));
            el_filter[4][i].textContent = opt_filter[4];
            el_filter[4][i].value = opt_filter[4];
            select_filter[4].appendChild(el_filter[4][i]);
          }
          $("#ha-isp-filter").multiSelect({
            afterSelect: function (values) {
              if (values[0] === "All ISPs") {
                for (let i = 0; i < options_filter[4].length; i++) {
                  $("#ha-isp-filter").multiSelect("deselect", options_filter[4][i]);
                }
                chosen_ha_isp_filters = [];
                chosen_ha_isp_filters.push(values[0]);
              }
              if (values[0] !== "All ISPs") {
                $("#ha-isp-filter").multiSelect("deselect", ["All ISPs"]);
                if (chosen_ha_isp_filters[0] === "All ISPs") {
                  chosen_ha_isp_filters.shift();
                }
                chosen_ha_isp_filters.push(values[0]);
              }
              draw_chart("header_analysis_histogram");
            },
            afterDeselect: function (values) {
              for (let i = 0; i < chosen_ha_isp_filters.length; i++) {
                if (values[0] === chosen_ha_isp_filters[i]) {
                  chosen_ha_isp_filters.splice(i, 1);
                }
              }
              draw_chart("header_analysis_histogram");
            },
          });
        },
      });
    }
  } else if (!event.target.checked) {
    if (event.target.value === "Content-Type") {
      document.getElementById("ct-filter-wrapper").style.display = "none";
    } else if (event.target.value === "Day of the Week Chart") {
      document.getElementById("dotw-filter-wrapper").style.display = "none";
    } else if (event.target.value === "HTTP Method") {
      document.getElementById("http-filter-wrapper").style.display = "none";
    } else if (event.target.value === "ISP") {
      document.getElementById("isp-filter-wrapper").style.display = "none";
    } else if (event.target.value === "TTL Content-Type") {
      document.getElementById("ttl-ct-filter-wrapper").style.display = "none";
    } else if (event.target.value === "HA ISP") {
      document.getElementById("ha-isp-filter-wrapper").style.display = "none";
    }
  }
}

/*const selectElementChart = document.querySelector("#selectChartType");

selectElementChart.addEventListener("change", (event) => {
  if (event.target.value === "Response Time Analysis by Hour") {
    $.ajax({
      type: "POST",
      url: "collect_data.php",
      data: {
        request: "request_time_analysis",
      },
      success: function (res) {
        if (rtaChart) {
          rtaChart.destroy();
        }
        rtaChart = new Chart(ctx, {
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
                borderWidth: 2,
                hoverBorderColor: "#b5b5b5",
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
  } else if (event.target.value === "ISP") {
    $.ajax({
      type: "POST",
      url: "collect_data.php",
      data: {
        request: "request_isp_chart",
      },
      success: function (res) {
        let array_switch = "0";
        let temp_array = [];
        let chart_data = [];
        let chart_isps = [];
        let chart_isps_avg = [];
        let isp_dataset = [];
        chart_data = JSON.parse(res);
        for (let i = 0; i < chart_data.length; i++) {
          if (chart_data[i] === "//") {
            array_switch = "1";
            continue;
          }
          if (chart_data[i] === "+") {
            chart_isps_avg.push(temp_array);
            temp_array = [];
            continue;
          }
          if (array_switch === "0") {
            chart_isps.push(chart_data[i]);
          } else {
            temp_array.push(chart_data[i]);
          }
          if (i === chart_data.length - 1) {
            chart_isps_avg.push(temp_array);
            temp_array = [];
          }
        }

        for (let i = 0; i < chart_isps.length; i++) {
          let temp = getRandomColor();
          isp_dataset.push({
            label: chart_isps[i],
            data: chart_isps_avg[i],
            backgroundColor: temp,
            borderColor: temp,
            borderWidth: 2,
            hoverBorderColor: "#b5b5b5",
          });
        }

        if (rtaChart) {
          rtaChart.destroy();
        }
        rtaChart = new Chart(ctx, {
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
            datasets: isp_dataset,
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
              xAxes: [
                {
                  barPercentage: 0.7,
                  categoryPercentage: 0.55,
                },
              ],
            },
          },
        });
      },
    });
    
  }
});
*/

function HeaderAnalysis() {
  if (document.getElementById("HeaderAnalysis").style.display !== "block") {
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
    let hha = document.getElementById("HeaderAnalysis");
    let sm = document.getElementById("map");
    nou.style.display = "none";
    rms.style.display = "none";
    rss.style.display = "none";
    ud.style.display = "none";
    isp.style.display = "none";
    aoc.style.display = "none";
    rta.style.display = "none";
    hha.style.display = "block";
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
}

//This function runs when Show Map is selected from Side Menu
function showMap() {
  if (document.getElementById("showMap").style.display !== "block") {
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
    let hha = document.getElementById("HeaderAnalysis");
    let sm = document.getElementById("map");
    nou.style.display = "none";
    rms.style.display = "none";
    rss.style.display = "none";
    ud.style.display = "none";
    isp.style.display = "none";
    aoc.style.display = "none";
    rta.style.display = "none";
    hha.style.display = "none";
    sm.style.display = "block";
    sm.style.visibility = "visible";
  }
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

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function draw_chart(chart_type) {
  if (chart_type === "response_time_analysis") {
    $.ajax({
      type: "POST",
      url: "collect_data.php",
      data: {
        request: "request_filtered_data",
        chosen_ct_filters: JSON.stringify(chosen_ct_filters),
        chosen_dotw_filters: JSON.stringify(chosen_dotw_filters),
        chosen_http_filters: JSON.stringify(chosen_http_filters),
        chosen_isp_filters: JSON.stringify(chosen_isp_filters),
      },
      success: function (res) {
        if (rtaChart) {
          rtaChart.destroy();
        }
        rtaChart = new Chart(ctx, {
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
                label: "Response Time",
                data: JSON.parse(res),
                backgroundColor: color_array,
                borderColor: color_array,
                borderWidth: 2,
                hoverBorderColor: "#b5b5b5",
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
              xAxes: [
                {
                  barPercentage: 0.7,
                  categoryPercentage: 0.55,
                },
              ],
            },
          },
        });
      },
    });
  } else if (chart_type === "header_analysis_histogram") {
    $.ajax({
      type: "POST",
      url: "collect_data.php",
      data: {
        request: "request_histogram_data",
        chosen_ttl_ct_filters: JSON.stringify(chosen_ttl_ct_filters),
        chosen_ha_isp_filters: JSON.stringify(chosen_ha_isp_filters),
      },
      success: function (res) {
        let temp_max_ages = [];
        let max_ages = [];
        let lowest_max_age;
        let highest_max_age;
        let count = -1;
        let result = [];
        let delta;
        let ranges_counter = [];
        temp_max_ages = JSON.parse(res);
        for (let i = 0; i < temp_max_ages.length; i++) {
          if (temp_max_ages[i] !== null && parseFloat(temp_max_ages[i]) > 0) {
            count++;
            max_ages.push(parseFloat(temp_max_ages[i]));
            if (count === 0) {
              lowest_max_age = max_ages[count];
              highest_max_age = max_ages[count];
            } else if (count > 0) {
              if (max_ages[count] > highest_max_age) {
                highest_max_age = max_ages[count];
              } else if (max_ages[count] < lowest_max_age) {
                lowest_max_age = max_ages[count];
              }
            }
          }
        }
        console.log(max_ages);
        delta = (highest_max_age - lowest_max_age) / 10;
        while (lowest_max_age < highest_max_age) {
          result.push(lowest_max_age);
          lowest_max_age += delta;
        }
        result.push(highest_max_age);
        if (result[result.length - 1] - result[result.length - 2] < delta) {
          result.splice(result.length - 2, 1);
        }
        for (let i = 0; i < 10; i++) {
          ranges_counter[i] = 0;
        }
        for (let i = 0; i < max_ages.length; i++) {
          for (let j = 0; j < result.length; j++) {
            if (j < result.length - 1) {
              if (max_ages[i] >= result[j] && max_ages[i] <= result[j + 1]) {
                ranges_counter[j]++;
                break;
              }
            }
          }
        }
        //console.log(result);
        //console.log(ranges_counter);
        //console.log(highest_max_age);
        //console.log(temp_max_ages);
        //console.log(max_ages);
        /*if (haChart) {
          haChart.destroy();
        }
        haChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["21:00", "22:00", "23:00"],
            datasets: [
              {
                label: "max-age range",
                data: JSON.parse(res),
                backgroundColor: color_array,
                borderColor: color_array,
                borderWidth: 2,
                hoverBorderColor: "#b5b5b5",
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
              xAxes: [
                {
                  barPercentage: 0.7,
                  categoryPercentage: 0.55,
                },
              ],
            },
          },
        });*/
      },
    });
  }
}
