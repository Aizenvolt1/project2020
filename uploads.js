"use strict";

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
let respone_content_type = [];
let respone_cache_control = [];
let respone_pragma = [];
let respone_expires = [];
let respone_age = [];
let respone_last_modified = [];
let respone_host = [];

//This is for when the user clicks Upload File
const fileInput = document.getElementById("input");
const button = document.querySelector("button");
button.onclick = () => {
  fileInput.click();
};

fileInput.onchange = () => {
  const selectedFiles = [...fileInput.files];
  let file = [];
  for (let i = 0; i < document.getElementById("input").files.length; i++) {
    file[i] = document.getElementById("input").files[i];
  }
  console.log(selectedFiles);
  passtoArray(file, "startedDateTime", startedDateTimes);
  passtoArray(file, "serverIPAddress", serverIPAddresses);
  passtoArray(file, "wait", timings_wait);
  passtoArray(file, "request_method", request_method);
  passtoArray(file, "request_url", request_url);
  passtoArray(file, "request_content_type", request_content_type);
  passtoArray(file, "request_cache_control", request_cache_control);
  passtoArray(file, "request_pragma", request_pragma);
  passtoArray(file, "request_expires", request_expires);
};

//This is for drag and drop area
const dropArea = document.getElementById("drop_area");
dropArea.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  event.dataTransfer.dropEffect = "copy";
});

dropArea.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  const fileList = event.dataTransfer.files;
  let count = 0;
  for (let i = 0; i < fileList.length; i++) {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      let fileContents = JSON.parse(fileReader.result);
      for (let j = 0; j < fileContents.log.entries.length; j++) {
        if (
          typeof fileContents.log.entries[j].serverIPAddress == "undefined" ||
          fileContents.log.entries[j].serverIPAddress == null ||
          fileContents.log.entries[j].serverIPAddress == ""
        ) {
          console.log(++count);
        } else {
          console.log(fileContents.log.entries[j].serverIPAddress);
        }
        if (j === fileContents.log.entries.length - 1) {
          console.log(
            "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
          );
        }
      }
    };
    let currentfiledropreader = fileReader.readAsText(fileList[i]);
  }
});

function passtoArray(files, name_of_element, array_of_element) {
  let count = 0;
  for (let i = 0; i < files.length; i++) {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      let fileContents = JSON.parse(fileReader.result);
      for (let j = 0; j < fileContents.log.entries.length; j++) {
        switch (name_of_element) {
          case "startedDateTime":
            if (
              typeof fileContents.log.entries[j].startedDateTime ==
                "undefined" ||
              fileContents.log.entries[j].startedDateTime == null ||
              fileContents.log.entries[j].startedDateTime == ""
            ) {
              console.log(++count);
              array_of_element.push(null);
            } else {
              console.log(fileContents.log.entries[j].startedDateTime);
              array_of_element.push(
                fileContents.log.entries[j].startedDateTime
              );
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "serverIPAddress":
            if (
              typeof fileContents.log.entries[j].serverIPAddress ==
                "undefined" ||
              fileContents.log.entries[j].serverIPAddress == null ||
              fileContents.log.entries[j].serverIPAddress == ""
            ) {
              console.log(++count);
              array_of_element.push(null);
            } else {
              console.log(fileContents.log.entries[j].serverIPAddress);
              array_of_element.push(
                fileContents.log.entries[j].serverIPAddress
              );
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "wait":
            if (
              typeof fileContents.log.entries[j].timings.wait == "undefined" ||
              fileContents.log.entries[j].timings.wait == null ||
              fileContents.log.entries[j].timings.wait == ""
            ) {
              console.log(++count);
              array_of_element.push(null);
            } else {
              console.log(fileContents.log.entries[j].timings.wait);
              array_of_element.push(fileContents.log.entries[j].timings.wait);
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "request_method":
            if (
              typeof fileContents.log.entries[j].request.method ==
                "undefined" ||
              fileContents.log.entries[j].request.method == null ||
              fileContents.log.entries[j].request.method == ""
            ) {
              console.log(++count);
              array_of_element.push(null);
            } else {
              console.log(fileContents.log.entries[j].request.method);
              array_of_element.push(fileContents.log.entries[j].request.method);
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "request_url":
            if (
              typeof fileContents.log.entries[j].request.url == "undefined" ||
              fileContents.log.entries[j].request.url == null ||
              fileContents.log.entries[j].request.url == ""
            ) {
              console.log(++count);
              array_of_element.push(null);
            } else {
              console.log(fileContents.log.entries[j].request.url);
              array_of_element.push(fileContents.log.entries[j].request.url);
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "request_url":
            if (
              typeof fileContents.log.entries[j].request.url == "undefined" ||
              fileContents.log.entries[j].request.url == null ||
              fileContents.log.entries[j].request.url == ""
            ) {
              console.log(++count);
              array_of_element.push(null);
            } else {
              console.log(fileContents.log.entries[j].request.url);
              array_of_element.push(fileContents.log.entries[j].request.url);
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "request_content_type":
            for (
              let k = 0;
              k < fileContents.log.entries[j].request.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].request.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].request.headers[k].name == null ||
                fileContents.log.entries[j].request.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].request.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].request.headers[k].value == null ||
                fileContents.log.entries[j].request.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].request.headers[k].name ===
                  "Content-Type" ||
                fileContents.log.entries[j].request.headers[k].name ===
                  "content-type"
              ) {
                console.log(
                  fileContents.log.entries[j].request.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].request.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "request_cache_control":
            for (
              let k = 0;
              k < fileContents.log.entries[j].request.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].request.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].request.headers[k].name == null ||
                fileContents.log.entries[j].request.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].request.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].request.headers[k].value == null ||
                fileContents.log.entries[j].request.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].request.headers[k].name ===
                  "Cache-Control" ||
                fileContents.log.entries[j].request.headers[k].name ===
                  "cache-control"
              ) {
                console.log(
                  fileContents.log.entries[j].request.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].request.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "request_pragma":
            for (
              let k = 0;
              k < fileContents.log.entries[j].request.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].request.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].request.headers[k].name == null ||
                fileContents.log.entries[j].request.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].request.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].request.headers[k].value == null ||
                fileContents.log.entries[j].request.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].request.headers[k].name ===
                  "pragma" ||
                fileContents.log.entries[j].request.headers[k].name === "Pragma"
              ) {
                console.log(
                  fileContents.log.entries[j].request.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].request.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "request_pragma":
            for (
              let k = 0;
              k < fileContents.log.entries[j].request.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].request.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].request.headers[k].name == null ||
                fileContents.log.entries[j].request.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].request.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].request.headers[k].value == null ||
                fileContents.log.entries[j].request.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].request.headers[k].name ===
                  "pragma" ||
                fileContents.log.entries[j].request.headers[k].name === "Pragma"
              ) {
                console.log(
                  fileContents.log.entries[j].request.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].request.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          default:
            console.log("No value found!");
        }
      }
    };
    let currentfilepickreader = fileReader.readAsText(files[i]);
  }
}
