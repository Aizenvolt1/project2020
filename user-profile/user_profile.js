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

function showResetUsername() {
  let su = document.getElementById("ResetUsername");
  let sp = document.getElementById("ResetPassword");
  let st = document.getElementById("ShowStatistics");
  let sm = document.getElementById("map");
  su.style.display = "block";
  sp.style.display = "none";
  st.style.display = "none";
  sm.style.display = "none";
}

function showResetPassword() {
  let su = document.getElementById("ResetUsername");
  let sp = document.getElementById("ResetPassword");
  let st = document.getElementById("ShowStatistics");
  let sm = document.getElementById("map");
  su.style.display = "none";
  sp.style.display = "block";
  st.style.display = "none";
  sm.style.display = "none";
}

function showStatistics() {
  let su = document.getElementById("ResetUsername");
  let sp = document.getElementById("ResetPassword");
  let st = document.getElementById("ShowStatistics");
  let sm = document.getElementById("map");
  su.style.display = "none";
  sp.style.display = "none";
  st.style.display = "block";
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
  let su = document.getElementById("ResetUsername");
  let sp = document.getElementById("ResetPassword");
  let st = document.getElementById("ShowStatistics");
  let sm = document.getElementById("map");
  su.style.display = "none";
  sp.style.display = "none";
  st.style.display = "none";
  sm.style.display = "block";
  sm.style.visibility = "visible";
}

function username_check() {
  let x = document.forms["u-form"]["new_username"].value;
  if (x === "") {
    document.getElementById("username-help-block").innerHTML = "Username must be filled!";
    return false;
  } else if (x.length < 6 || x.length > 16) {
    document.getElementById("username-help-block").innerHTML =
      "Username must be between 6 and 16 characters!";
    return false;
  } else if (x.indexOf(" ") > 0) {
    document.getElementById("username-help-block").innerHTML = "Username must not have spaces!";
    return false;
  } else {
    document.getElementById("new-username").submit();
    return true;
  }
}

function password_check() {
  let new_pass = document.forms["pass-form"]["new_password"].value;
  let conf_pass = document.forms["pass-form"]["confirm_password"].value;
  if (new_pass === "" || conf_pass === "") {
    document.getElementById("password-help-block").innerHTML =
      "One of the password fields is empty!";
    return false;
  } else if (new_pass !== conf_pass) {
    document.getElementById("password-help-block").innerHTML = "Passwords must match!";
    return false;
  } else if (new_pass.length < 8) {
    document.getElementById("password-help-block").innerHTML =
      "Password must be at least 8 characters!";
    return false;
  } else if (new_pass.indexOf(" ") > 0) {
    document.getElementById("password-help-block").innerHTML = "Password must not have spaces!";
    return false;
  } else if (!/[A-Z]/g.test(new_pass) || !/[0-9]/g.test(new_pass) || !/[.!@#$&*]/g.test(new_pass)) {
    document.getElementById("password-help-block").innerHTML =
      "Password must contain at least 8 character and must also contain, at least one capital letter, a digit and one of these symbols(e.g. .!#$*&@)!";
    return false;
  } else {
    document.getElementById("new-password").submit();
    return true;
  }
}

// Creating map options
var mapOptions = {
  center: [17.385044, 78.486671],
  zoom: 10,
};

// Creating a map object
var map = new L.map("map", mapOptions);

// Creating a Layer object
var layer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

// Adding layer to the map
map.addLayer(layer);
