"use strict";

//Dilono tous pinakes pou that balo ta dedomena ton har sti sunexeia
let startedDateTimes = [];
let timings_wait = [];
let serverIPAddresses = [];
let request_method = [];
let request_url = [];
let request_content_type = [];
let request_cache_control = [];
let request_pragma = [];
let request_expires = [];
let request_age = [];
let request_last_modified = [];
let request_host = [];
let response_status = [];
let response_statusText = [];
let response_content_type = [];
let response_cache_control = [];
let response_pragma = [];
let response_expires = [];
let response_age = [];
let response_last_modified = [];
let response_host = [];
let dow_files = [];
let filenames = [];
let city_latitude = [];
let city_longitude = [];
let server_latitude = [];
let server_longitude = [];
let isp = [];

let file = [];
let fileList;
let input_type = 0;
//This is for when the user clicks Upload File
const fileInput = document.getElementById("input");
const button = document.querySelector("button");
button.onclick = () => {
  fileInput.click();
};

//Fires when the contents of the object or selection have changed.
fileInput.onchange = () => {
  input_type = 1;
  const selectedFiles = [...fileInput.files];

  for (let i = 0; i < document.getElementById("input").files.length; i++) {
    file[i] = document.getElementById("input").files[i];
  }
  console.log(selectedFiles);

  async function proccessed_file() {
    for (let i = 0; i < file.length; i++) {
      await Remove_File_Properties(file[i]);
    }
  }

  proccessed_file();
};

//This is for drag and drop area
const dropArea = document.getElementById("drop_area");
dropArea.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  event.dataTransfer.dropEffect = "copy";
});

//I idia diadikasia pou ekana sto fileInput.onchange
dropArea.addEventListener("drop", (event) => {
  input_type = 2;
  event.stopPropagation();
  event.preventDefault();
  enableButton();
  fileList = event.dataTransfer.files;

  async function proccessed_dropped_file() {
    for (let i = 0; i < fileList.length; i++) {
      await Remove_File_Properties(fileList[i]);
    }
  }
  proccessed_dropped_file();
});

function passtoArray(files, name_of_element, array_of_element) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    let currentfilepickreader = fileReader.readAsText(files);
    fileReader.onload = function () {
      let fileContents = JSON.parse(fileReader.result);
      for (let j = 0; j < fileContents.log.entries.length; j++) {
        switch (name_of_element) {
          case "startedDateTime":
            if (
              typeof fileContents.log.entries[j].startedDateTime == "undefined" ||
              fileContents.log.entries[j].startedDateTime == null ||
              fileContents.log.entries[j].startedDateTime == ""
            ) {
              array_of_element.push(null);
            } else {
              array_of_element.push(
                fileContents.log.entries[j].startedDateTime.match(/\d\d\d\d-\d\d-\d\d/g) +
                  " " +
                  fileContents.log.entries[j].startedDateTime.match(/\d\d:\d\d:\d\d/g)
              );
            }
            if (typeof array_of_element[j] === "undefined") {
              array_of_element[j] = null;
            }
            resolve();
            break;
          case "serverIPAddress":
            if (
              typeof fileContents.log.entries[j].serverIPAddress == "undefined" ||
              fileContents.log.entries[j].serverIPAddress == null ||
              fileContents.log.entries[j].serverIPAddress == ""
            ) {
              array_of_element.push(null);
            } else {
              array_of_element.push(fileContents.log.entries[j].serverIPAddress);
            }
            if (typeof array_of_element[j] === "undefined") {
              array_of_element[j] = null;
            }
            resolve();
            break;
          case "wait":
            if (
              typeof fileContents.log.entries[j].timings.wait == "undefined" ||
              fileContents.log.entries[j].timings.wait == null ||
              fileContents.log.entries[j].timings.wait == ""
            ) {
              array_of_element.push(null);
            } else {
              array_of_element.push(fileContents.log.entries[j].timings.wait);
            }
            if (typeof array_of_element[j] === "undefined") {
              array_of_element[j] = null;
            }
            resolve();
            break;
          case "request_method":
            if (
              typeof fileContents.log.entries[j].request.method == "undefined" ||
              fileContents.log.entries[j].request.method == null ||
              fileContents.log.entries[j].request.method == ""
            ) {
              array_of_element.push(null);
            } else {
              array_of_element.push(fileContents.log.entries[j].request.method);
            }
            if (typeof array_of_element[j] === "undefined") {
              array_of_element[j] = null;
            }
            resolve();
            break;
          case "request_url":
            if (
              typeof fileContents.log.entries[j].request.url == "undefined" ||
              fileContents.log.entries[j].request.url == null ||
              fileContents.log.entries[j].request.url == ""
            ) {
              array_of_element.push(null);
            } else {
              array_of_element.push(fileContents.log.entries[j].request.url.match(/(?<=\/\/)(.*?)(?=\/|$)/g));
            }
            if (typeof array_of_element[j] === "undefined") {
              array_of_element[j] = null;
            }
            resolve();
            break;
          case "request_content_type":
            for (let k = 0; k < fileContents.log.entries[j].request.headers.length; k++) {
              if (fileContents.log.entries[j].request.headers[k].name.toLowerCase() === "content-type") {
                if (fileContents.log.entries[j].request.headers[k].value != "") {
                  array_of_element.push(fileContents.log.entries[j].request.headers[k].value);
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].request.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "request_cache_control":
            for (let k = 0; k < fileContents.log.entries[j].request.headers.length; k++) {
              if (fileContents.log.entries[j].request.headers[k].name.toLowerCase() === "cache-control") {
                if (fileContents.log.entries[j].request.headers[k].value != "") {
                  array_of_element.push(fileContents.log.entries[j].request.headers[k].value);
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].request.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "request_pragma":
            for (let k = 0; k < fileContents.log.entries[j].request.headers.length; k++) {
              if (fileContents.log.entries[j].request.headers[k].name.toLowerCase() === "pragma") {
                if (fileContents.log.entries[j].request.headers[k].value != "") {
                  array_of_element.push(fileContents.log.entries[j].request.headers[k].value);
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].request.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "request_expires":
            for (let k = 0; k < fileContents.log.entries[j].request.headers.length; k++) {
              if (fileContents.log.entries[j].request.headers[k].name.toLowerCase() === "expires") {
                if (fileContents.log.entries[j].request.headers[k].value != "") {
                  console.log(array_of_element);
                  let month;
                  if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("jan") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jan") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("JAN")
                  ) {
                    month = 1;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("feb") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Feb") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("FEB")
                  ) {
                    month = 2;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("mar") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Mar") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("MAR")
                  ) {
                    month = 3;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("apr") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Apr") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("APR")
                  ) {
                    month = 4;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("may") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("May") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("MAY")
                  ) {
                    month = 5;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("jun") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jun") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("JUN")
                  ) {
                    month = 6;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("jul") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jul") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("JUL")
                  ) {
                    month = 7;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("aug") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Aug") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("AUG")
                  ) {
                    month = 8;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("sep") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Sep") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("SEP")
                  ) {
                    month = 9;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("oct") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Oct") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("OCT")
                  ) {
                    month = 10;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("nov") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Nov") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("NOV")
                  ) {
                    month = 11;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("dec") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Dec") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("DEC")
                  ) {
                    month = 12;
                  }
                  array_of_element.push(
                    fileContents.log.entries[j].request.headers[k].value.match(/\d\d\d\d/g)[0].match(/^\d\d\d\d/g) +
                      "-" +
                      month +
                      "-" +
                      fileContents.log.entries[j].request.headers[k].value.match(/\d\d/g)[0].match(/^\d\d/g) +
                      " " +
                      fileContents.log.entries[j].request.headers[k].value.match(/\d\d:\d\d:\d\d/g)
                  );
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].request.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "request_age":
            for (let k = 0; k < fileContents.log.entries[j].request.headers.length; k++) {
              if (fileContents.log.entries[j].request.headers[k].name.toLowerCase() === "age") {
                if (fileContents.log.entries[j].request.headers[k].value != "") {
                  array_of_element.push(fileContents.log.entries[j].request.headers[k].value);
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].request.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "request_last_modified":
            for (let k = 0; k < fileContents.log.entries[j].request.headers.length; k++) {
              if (fileContents.log.entries[j].request.headers[k].name.toLowerCase() === "last-modified") {
                if (
                  typeof fileContents.log.entries[j].request.headers[k].value != undefined &&
                  fileContents.log.entries[j].request.headers[k].value != ""
                ) {
                  let month;
                  if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("jan") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jan") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("JAN")
                  ) {
                    month = 1;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("feb") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Feb") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("FEB")
                  ) {
                    month = 2;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("mar") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Mar") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("MAR")
                  ) {
                    month = 3;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("apr") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Apr") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("APR")
                  ) {
                    month = 4;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("may") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("May") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("MAY")
                  ) {
                    month = 5;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("jun") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jun") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("JUN")
                  ) {
                    month = 6;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("jul") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jul") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("JUL")
                  ) {
                    month = 7;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("aug") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Aug") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("AUG")
                  ) {
                    month = 8;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("sep") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Sep") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("SEP")
                  ) {
                    month = 9;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("oct") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Oct") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("OCT")
                  ) {
                    month = 10;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("nov") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Nov") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("NOV")
                  ) {
                    month = 11;
                  } else if (
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("dec") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("Dec") ||
                    fileContents.log.entries[j].request.headers[k].value.match(/.*:\d\d/gi)[0].includes("DEC")
                  ) {
                    month = 12;
                  }
                  array_of_element.push(
                    fileContents.log.entries[j].request.headers[k].value.match(/\d\d\d\d/g)[0].match(/^\d\d\d\d/g) +
                      "-" +
                      month +
                      "-" +
                      fileContents.log.entries[j].request.headers[k].value.match(/\d\d/g)[0].match(/^\d\d/g) +
                      " " +
                      fileContents.log.entries[j].request.headers[k].value.match(/\d\d:\d\d:\d\d/g)
                  );
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].request.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "request_host":
            for (let k = 0; k < fileContents.log.entries[j].request.headers.length; k++) {
              if (fileContents.log.entries[j].request.headers[k].name.toLowerCase() === "host") {
                if (fileContents.log.entries[j].request.headers[k].value != "") {
                  array_of_element.push(fileContents.log.entries[j].request.headers[k].value);
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].request.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "response_content_type":
            for (let k = 0; k < fileContents.log.entries[j].response.headers.length; k++) {
              if (fileContents.log.entries[j].response.headers[k].name.toLowerCase() === "content-type") {
                if (fileContents.log.entries[j].response.headers[k].value != "") {
                  array_of_element.push(fileContents.log.entries[j].response.headers[k].value);
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].response.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            //fileContents.log.entries[j].request.url.match(/(?<=\/\/)(.*?)(?=\/|$)/g);
            resolve();
            break;
          case "response_cache_control":
            for (let k = 0; k < fileContents.log.entries[j].response.headers.length; k++) {
              if (fileContents.log.entries[j].response.headers[k].name.toLowerCase() === "cache-control") {
                if (fileContents.log.entries[j].response.headers[k].value != "") {
                  array_of_element.push(fileContents.log.entries[j].response.headers[k].value);
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].response.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "response_pragma":
            for (let k = 0; k < fileContents.log.entries[j].response.headers.length; k++) {
              if (fileContents.log.entries[j].response.headers[k].name.toLowerCase() === "pragma") {
                if (fileContents.log.entries[j].response.headers[k].value != "") {
                  array_of_element.push(fileContents.log.entries[j].response.headers[k].value);
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].response.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "response_expires":
            for (let k = 0; k < fileContents.log.entries[j].response.headers.length; k++) {
              if (fileContents.log.entries[j].response.headers[k].name.toLowerCase() === "expires") {
                if (
                  fileContents.log.entries[j].response.headers[k].value != "" &&
                  fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi) != null
                ) {
                  let month;
                  if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("jan") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jan") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("JAN")
                  ) {
                    month = 1;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("feb") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Feb") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("FEB")
                  ) {
                    month = 2;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("mar") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Mar") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("MAR")
                  ) {
                    month = 3;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("apr") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Apr") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("APR")
                  ) {
                    month = 4;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("may") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("May") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("MAY")
                  ) {
                    month = 5;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("jun") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jun") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("JUN")
                  ) {
                    month = 6;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("jul") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jul") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("JUL")
                  ) {
                    month = 7;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("aug") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Aug") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("AUG")
                  ) {
                    month = 8;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("sep") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Sep") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("SEP")
                  ) {
                    month = 9;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("oct") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Oct") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("OCT")
                  ) {
                    month = 10;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("nov") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Nov") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("NOV")
                  ) {
                    month = 11;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("dec") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Dec") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("DEC")
                  ) {
                    month = 12;
                  }
                  array_of_element.push(
                    fileContents.log.entries[j].response.headers[k].value.match(/\d\d\d\d/g)[0].match(/^\d\d\d\d/g) +
                      "-" +
                      month +
                      "-" +
                      fileContents.log.entries[j].response.headers[k].value.match(/\d\d/g)[0].match(/^\d\d/g) +
                      " " +
                      fileContents.log.entries[j].response.headers[k].value.match(/\d\d:\d\d:\d\d/g)
                  );
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].response.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "response_age":
            for (let k = 0; k < fileContents.log.entries[j].response.headers.length; k++) {
              if (fileContents.log.entries[j].response.headers[k].name.toLowerCase() === "age") {
                if (fileContents.log.entries[j].response.headers[k].value != "") {
                  array_of_element.push(fileContents.log.entries[j].response.headers[k].value);
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].response.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "response_last_modified":
            for (let k = 0; k < fileContents.log.entries[j].response.headers.length; k++) {
              if (fileContents.log.entries[j].response.headers[k].name.toLowerCase() === "last-modified") {
                if (
                  typeof fileContents.log.entries[j].response.headers[k].value != undefined &&
                  fileContents.log.entries[j].response.headers[k].value != ""
                ) {
                  let month;
                  if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("jan") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jan") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("JAN")
                  ) {
                    month = 1;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("feb") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Feb") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("FEB")
                  ) {
                    month = 2;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("mar") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Mar") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("MAR")
                  ) {
                    month = 3;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("apr") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Apr") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("APR")
                  ) {
                    month = 4;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("may") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("May") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("MAY")
                  ) {
                    month = 5;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("jun") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jun") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("JUN")
                  ) {
                    month = 6;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("jul") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Jul") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("JUL")
                  ) {
                    month = 7;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("aug") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Aug") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("AUG")
                  ) {
                    month = 8;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("sep") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Sep") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("SEP")
                  ) {
                    month = 9;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("oct") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Oct") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("OCT")
                  ) {
                    month = 10;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("nov") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Nov") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("NOV")
                  ) {
                    month = 11;
                  } else if (
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("dec") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("Dec") ||
                    fileContents.log.entries[j].response.headers[k].value.match(/.*:\d\d/gi)[0].includes("DEC")
                  ) {
                    month = 12;
                  }
                  array_of_element.push(
                    fileContents.log.entries[j].response.headers[k].value.match(/\d\d\d\d/g)[0].match(/^\d\d\d\d/g) +
                      "-" +
                      month +
                      "-" +
                      fileContents.log.entries[j].response.headers[k].value.match(/\d\d/g)[0].match(/^\d\d/g) +
                      " " +
                      fileContents.log.entries[j].response.headers[k].value.match(/\d\d:\d\d:\d\d/g)
                  );
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].response.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "response_host":
            for (let k = 0; k < fileContents.log.entries[j].response.headers.length; k++) {
              if (fileContents.log.entries[j].response.headers[k].name.toLowerCase() === "host") {
                if (fileContents.log.entries[j].response.headers[k].value != "") {
                  array_of_element.push(fileContents.log.entries[j].response.headers[k].value);
                  break;
                } else {
                  array_of_element.push(null);
                  break;
                }
              }
              if (k === fileContents.log.entries[j].response.headers.length - 1) {
                array_of_element.push(null);
              }
            }
            resolve();
            break;
          case "response_status":
            if (
              typeof fileContents.log.entries[j].response.status == "undefined" ||
              fileContents.log.entries[j].response.status == null ||
              fileContents.log.entries[j].response.status == ""
            ) {
              array_of_element.push(null);
            } else {
              array_of_element.push(fileContents.log.entries[j].response.status);
            }
            if (typeof array_of_element[j] === "undefined") {
              array_of_element[j] = null;
            }
            resolve();
            break;
          case "response_statusText":
            if (
              typeof fileContents.log.entries[j].response.statusText == "undefined" ||
              fileContents.log.entries[j].response.statusText == null ||
              fileContents.log.entries[j].response.statusText == ""
            ) {
              array_of_element.push(null);
            } else {
              array_of_element.push(fileContents.log.entries[j].response.statusText);
            }
            if (typeof array_of_element[j] === "undefined") {
              array_of_element[j] = null;
            }
            resolve();
            break;
          default:
            console.log("No value found!");
        }
      }
    };
  });
}

//H parakato sunartisi afairei ta dedomena pou de xreiazontai apo ta arxeia pou anebazei o xristis.
function Remove_File_Properties(files) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    let currentfilepickreader = fileReader.readAsText(files);
    fileReader.onload = function () {
      let fileContents = JSON.parse(fileReader.result);
      for (let x in fileContents.log) {
        if (x.toLowerCase() !== "entries") {
          delete fileContents.log[x];
        }
      }
      for (let i = 0; i < fileContents.log.entries.length; i++) {
        for (let x in fileContents.log.entries[i]) {
          if (
            x.toLowerCase() !== "request" &&
            x.toLowerCase() !== "response" &&
            x.toLowerCase() !== "timings" &&
            x.toLowerCase() !== "starteddatetime" &&
            x.toLowerCase() !== "serveripaddress"
          ) {
            delete fileContents.log.entries[i][x];
          }
          if (x.toLowerCase() === "starteddatetime") {
            fileContents.log.entries[i].startedDateTime =
              fileContents.log.entries[i].startedDateTime.match(/\d\d\d\d-\d\d-\d\d/g) +
              " " +
              fileContents.log.entries[i].startedDateTime.match(/\d\d:\d\d:\d\d/g);
          }
        }
      }
      for (let i = 0; i < fileContents.log.entries.length; i++) {
        for (let x in fileContents.log.entries[i].timings) {
          if (x.toLowerCase() !== "wait") {
            delete fileContents.log.entries[i].timings[x];
          }
        }
      }
      for (let i = 0; i < fileContents.log.entries.length; i++) {
        for (let x in fileContents.log.entries[i].request) {
          if (x.toLowerCase() !== "method" && x.toLowerCase() !== "url" && x.toLowerCase() !== "headers") {
            delete fileContents.log.entries[i].request[x];
          }
          if (x.toLowerCase() === "url") {
            if (
              typeof fileContents.log.entries[i].request[x] == "undefined" ||
              fileContents.log.entries[i].request[x] == null ||
              fileContents.log.entries[i].request[x] == ""
            ) {
              fileContents.log.entries[i].request[x] == null;
            } else {
              fileContents.log.entries[i].request[x] = fileContents.log.entries[i].request[x].match(/(?<=\/\/)(.*?)(?=\/|$)/g);
            }
            if (typeof fileContents.log.entries[i].request[x] === "undefined") {
              fileContents.log.entries[i].request[x] == null;
            }
          }
        }
      }
      for (let i = 0; i < fileContents.log.entries.length; i++) {
        for (let x in fileContents.log.entries[i].response) {
          if (x.toLowerCase() !== "status" && x.toLowerCase() !== "statustext" && x.toLowerCase() !== "headers") {
            delete fileContents.log.entries[i].response[x];
          }
        }
      }
      let needed_data = [];
      for (let i = 0; i < fileContents.log.entries.length; i++) {
        for (let j = 0; j < fileContents.log.entries[i].request.headers.length; j++) {
          if (
            fileContents.log.entries[i].request.headers[j].name.toLowerCase() === "content-type" ||
            fileContents.log.entries[i].request.headers[j].name.toLowerCase() === "cache-control" ||
            fileContents.log.entries[i].request.headers[j].name.toLowerCase() === "pragma" ||
            fileContents.log.entries[i].request.headers[j].name.toLowerCase() === "expires" ||
            fileContents.log.entries[i].request.headers[j].name.toLowerCase() === "age" ||
            fileContents.log.entries[i].request.headers[j].name.toLowerCase() === "last-modified" ||
            fileContents.log.entries[i].request.headers[j].name.toLowerCase() === "host"
          ) {
            needed_data.push(fileContents.log.entries[i].request.headers[j]);
          }
        }
        if (needed_data.length === 0) {
          needed_data.push(null);
        }
        for (let m = 0; m < needed_data.length; m++) {
          if (needed_data[m] != null && typeof needed_data[m].name == "undefined") {
            needed_data[m].name = null;
          } else if (needed_data[m] != null && typeof needed_data[m].value == "undefined") {
            needed_data[m].value = null;
          } else if (needed_data[m] != null && typeof needed_data[m] == "undefined") {
            needed_data[m] = null;
          }
        }
        fileContents.log.entries[i].request.headers = [];
        for (let k = 0; k < needed_data.length; k++) {
          fileContents.log.entries[i].request.headers.push(needed_data[k]);
        }
        needed_data = [];
      }

      needed_data = [];
      for (let i = 0; i < fileContents.log.entries.length; i++) {
        for (let j = 0; j < fileContents.log.entries[i].response.headers.length; j++) {
          if (
            fileContents.log.entries[i].response.headers[j].name.toLowerCase() === "content-type" ||
            fileContents.log.entries[i].response.headers[j].name.toLowerCase() === "cache-control" ||
            fileContents.log.entries[i].response.headers[j].name.toLowerCase() === "pragma" ||
            fileContents.log.entries[i].response.headers[j].name.toLowerCase() === "expires" ||
            fileContents.log.entries[i].response.headers[j].name.toLowerCase() === "age" ||
            fileContents.log.entries[i].response.headers[j].name.toLowerCase() === "last-modified" ||
            fileContents.log.entries[i].response.headers[j].name.toLowerCase() === "host"
          ) {
            needed_data.push(fileContents.log.entries[i].response.headers[j]);
          }
        }
        if (needed_data.length === 0) {
          needed_data.push(null);
        }
        for (let m = 0; m < needed_data.length; m++) {
          if (needed_data[m] != null && typeof needed_data[m].name == "undefined") {
            needed_data[m].name = null;
          } else if (needed_data[m] != null && typeof needed_data[m].value == "undefined") {
            needed_data[m].value = null;
          } else if (needed_data[m] != null && typeof needed_data[m] == "undefined") {
            needed_data[m] = null;
          }
        }
        fileContents.log.entries[i].response.headers = [];
        for (let k = 0; k < needed_data.length; k++) {
          fileContents.log.entries[i].response.headers.push(needed_data[k]);
        }
        needed_data = [];
      }
      dow_files.push(fileContents);
      filenames.push(files.name);
      fetch("https://ipapi.co/json/")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          city_latitude.push(data.latitude);
          city_longitude.push(data.longitude);
          isp.push(data.org);
        });
      resolve();
    };
  });
}

function downloadLoop() {
  for (let k = 0; k < filenames.length; k++) {
    downloadFile(k);
  }
}

function downloadFile(i) {
  let save = document.getElementById("dfiles").value;
  let blob = new Blob([JSON.stringify(dow_files[i])], {
    type: "application/json",
  });
  let fname = filenames[i];
  saveAs(blob, fname);
}

function datatoPHP() {
  if (input_type === 1) {
    async function proccessing_data() {
      //Kalo ti sunartisi pou dimiourgisa h opoia pairnei san eisodo to pinaka me ola ta files, to onoma ton dedomenon pou
      //theloume na parei apo to har file kai telos ton pinaka pou tha balei auta ta dedomena
      for (let i = 0; i < file.length; i++) {
        await passtoArray(file[i], "startedDateTime", startedDateTimes);
        await passtoArray(file[i], "serverIPAddress", serverIPAddresses);
        await passtoArray(file[i], "wait", timings_wait);
        await passtoArray(file[i], "request_method", request_method);
        await passtoArray(file[i], "request_url", request_url);
        await passtoArray(file[i], "request_content_type", request_content_type);
        await passtoArray(file[i], "request_cache_control", request_cache_control);
        await passtoArray(file[i], "request_pragma", request_pragma);
        await passtoArray(file[i], "request_expires", request_expires);
        await passtoArray(file[i], "request_age", request_age);
        await passtoArray(file[i], "request_last_modified", request_last_modified);
        await passtoArray(file[i], "request_host", request_host);
        await passtoArray(file[i], "response_content_type", response_content_type);
        await passtoArray(file[i], "response_cache_control", response_cache_control);
        await passtoArray(file[i], "response_pragma", response_pragma);
        await passtoArray(file[i], "response_expires", response_expires);
        await passtoArray(file[i], "response_age", response_age);
        await passtoArray(file[i], "response_last_modified", response_last_modified);
        await passtoArray(file[i], "response_host", response_host);
        await passtoArray(file[i], "response_status", response_status);
        await passtoArray(file[i], "response_statusText", response_statusText);
        for (let j = 0; j < serverIPAddresses.length; j++) {
          await get_server_locations(j);
        }
        $.ajax({
          type: "POST",
          url: "./file-processing/har_reader.php",
          data: {
            startedDateTimes: JSON.stringify(startedDateTimes),
            timings_wait: JSON.stringify(timings_wait),
            serverIPAddresses: JSON.stringify(serverIPAddresses),
            request_method: JSON.stringify(request_method),
            request_url: JSON.stringify(request_url),
            request_content_type: JSON.stringify(request_content_type),
            request_cache_control: JSON.stringify(request_cache_control),
            request_pragma: JSON.stringify(request_pragma),
            request_expires: JSON.stringify(request_expires),
            request_age: JSON.stringify(request_age),
            request_last_modified: JSON.stringify(request_last_modified),
            request_host: JSON.stringify(request_host),
            response_status: JSON.stringify(response_status),
            response_statusText: JSON.stringify(response_statusText),
            response_content_type: JSON.stringify(response_content_type),
            response_cache_control: JSON.stringify(response_cache_control),
            response_pragma: JSON.stringify(response_pragma),
            response_expires: JSON.stringify(response_expires),
            response_age: JSON.stringify(response_age),
            response_last_modified: JSON.stringify(response_last_modified),
            response_host: JSON.stringify(response_host),
            dow_files: JSON.stringify(dow_files),
            filenames: JSON.stringify(filenames),
            city_latitude: JSON.stringify(city_latitude),
            city_longitude: JSON.stringify(city_longitude),
            server_latitude: JSON.stringify(server_latitude),
            server_longitude: JSON.stringify(server_longitude),
            isp: JSON.stringify(isp),
            reloads: "command",
          },
          success: function (res) {
            if (i === file.length - 1) {
              location.reload();
            }
          },
        });
        startedDateTimes = [];
        timings_wait = [];
        serverIPAddresses = [];
        request_method = [];
        request_url = [];
        request_content_type = [];
        request_cache_control = [];
        request_pragma = [];
        request_expires = [];
        request_age = [];
        request_last_modified = [];
        request_host = [];
        response_status = [];
        response_statusText = [];
        response_content_type = [];
        response_cache_control = [];
        response_pragma = [];
        response_expires = [];
        response_age = [];
        response_last_modified = [];
        response_host = [];
        server_latitude = [];
        server_longitude = [];
      }
    }
    proccessing_data();
  } else if (input_type === 2) {
    async function proccessing_drop_data() {
      for (let i = 0; i < fileList.length; i++) {
        await passtoArray(fileList[i], "startedDateTime", startedDateTimes);
        await passtoArray(fileList[i], "serverIPAddress", serverIPAddresses);
        await passtoArray(fileList[i], "wait", timings_wait);
        await passtoArray(fileList[i], "request_method", request_method);
        await passtoArray(fileList[i], "request_url", request_url);
        await passtoArray(fileList[i], "request_content_type", request_content_type);
        await passtoArray(fileList[i], "request_cache_control", request_cache_control);
        await passtoArray(fileList[i], "request_pragma", request_pragma);
        await passtoArray(fileList[i], "request_expires", request_expires);
        await passtoArray(fileList[i], "request_age", request_age);
        await passtoArray(fileList[i], "request_last_modified", request_last_modified);
        await passtoArray(fileList[i], "request_host", request_host);
        await passtoArray(fileList[i], "response_content_type", response_content_type);
        await passtoArray(fileList[i], "response_cache_control", response_cache_control);
        await passtoArray(fileList[i], "response_pragma", response_pragma);
        await passtoArray(fileList[i], "response_expires", response_expires);
        await passtoArray(fileList[i], "response_age", response_age);
        await passtoArray(fileList[i], "response_last_modified", response_last_modified);
        await passtoArray(fileList[i], "response_host", response_host);
        await passtoArray(fileList[i], "response_status", response_status);
        await passtoArray(fileList[i], "response_statusText", response_statusText);
        for (let j = 0; j < serverIPAddresses.length; j++) {
          await get_server_locations(j);
        }
        $.ajax({
          type: "POST",
          url: "./file-processing/har_reader.php",
          data: {
            startedDateTimes: JSON.stringify(startedDateTimes),
            timings_wait: JSON.stringify(timings_wait),
            serverIPAddresses: JSON.stringify(serverIPAddresses),
            request_method: JSON.stringify(request_method),
            request_url: JSON.stringify(request_url),
            request_content_type: JSON.stringify(request_content_type),
            request_cache_control: JSON.stringify(request_cache_control),
            request_pragma: JSON.stringify(request_pragma),
            request_expires: JSON.stringify(request_expires),
            request_age: JSON.stringify(request_age),
            request_last_modified: JSON.stringify(request_last_modified),
            request_host: JSON.stringify(request_host),
            response_status: JSON.stringify(response_status),
            response_statusText: JSON.stringify(response_statusText),
            response_content_type: JSON.stringify(response_content_type),
            response_cache_control: JSON.stringify(response_cache_control),
            response_pragma: JSON.stringify(response_pragma),
            response_expires: JSON.stringify(response_expires),
            response_age: JSON.stringify(response_age),
            response_last_modified: JSON.stringify(response_last_modified),
            response_host: JSON.stringify(response_host),
            dow_files: JSON.stringify(dow_files),
            filenames: JSON.stringify(filenames),
            city_latitude: JSON.stringify(city_latitude),
            city_longitude: JSON.stringify(city_longitude),
            server_latitude: JSON.stringify(server_latitude),
            server_longitude: JSON.stringify(server_longitude),
            isp: JSON.stringify(isp),
            reloads: "command",
          },
          success: function (res) {
            if (i === fileList.length - 1) {
              location.reload();
            }
          },
        });

        startedDateTimes = [];
        timings_wait = [];
        serverIPAddresses = [];
        request_method = [];
        request_url = [];
        request_content_type = [];
        request_cache_control = [];
        request_pragma = [];
        request_expires = [];
        request_age = [];
        request_last_modified = [];
        request_host = [];
        response_status = [];
        response_statusText = [];
        response_content_type = [];
        response_cache_control = [];
        response_pragma = [];
        response_expires = [];
        response_age = [];
        response_last_modified = [];
        response_host = [];
        server_latitude = [];
        server_longitude = [];
      }
    }
    proccessing_drop_data();
  }
}

function get_server_locations(pos) {
  return new Promise((resolve, reject) => {
    if (serverIPAddresses[pos] != null) {
      fetch("https://get.geojs.io/v1/ip/geo/" + serverIPAddresses[pos] + ".json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          server_latitude.push(data.latitude);
          server_longitude.push(data.longitude);
          resolve();
        });
    } else {
      server_latitude.push(null);
      server_longitude.push(null);
      resolve();
    }
  });
}
