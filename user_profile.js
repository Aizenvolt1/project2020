"use strict";

function showCustomer(str) {
  var xhttp;
  if (str == "") {
    document.getElementById("txtHint").innerHTML = "";
    return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "getcustomer.php?q=" + str, true);
  xhttp.send();
}

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
