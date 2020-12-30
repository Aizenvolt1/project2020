"use strict";

function showResetUsername() {
  let su = document.getElementById("ResetUsername");
  let sp = document.getElementById("ResetPassword");
  let st = document.getElementById("ShowStatistics");
  su.style.display = "block";
  sp.style.display = "none";
  st.style.display = "none";
}

function showResetPassword() {
  let su = document.getElementById("ResetUsername");
  let sp = document.getElementById("ResetPassword");
  let st = document.getElementById("ShowStatistics");
  su.style.display = "none";
  sp.style.display = "block";
  st.style.display = "none";
}

function showStatistics() {
  let su = document.getElementById("ResetUsername");
  let sp = document.getElementById("ResetPassword");
  let st = document.getElementById("ShowStatistics");
  su.style.display = "none";
  sp.style.display = "none";
  st.style.display = "block";
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
