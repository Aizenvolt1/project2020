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
let response_content_type = [];
let response_cache_control = [];
let response_pragma = [];
let response_expires = [];
let response_age = [];
let response_last_modified = [];
let response_host = [];

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
  /*
  passtoArray(file, "startedDateTime", startedDateTimes);
  passtoArray(file, "serverIPAddress", serverIPAddresses);
  passtoArray(file, "wait", timings_wait);
  passtoArray(file, "request_method", request_method);
  passtoArray(file, "request_url", request_url);
  passtoArray(file, "request_content_type", request_content_type);
  passtoArray(file, "request_cache_control", request_cache_control);
  passtoArray(file, "request_pragma", request_pragma);
  passtoArray(file, "request_expires", request_expires);
  passtoArray(file, "request_age", request_age);
  passtoArray(file, "request_last_modified", request_last_modified);
  passtoArray(file, "request_host", request_host);
  passtoArray(file, "response_content_type", response_content_type);
  passtoArray(file, "response_cache_control", response_cache_control);
  passtoArray(file, "response_pragma", response_pragma);
  passtoArray(file, "response_expires", response_expires);
  passtoArray(file, "response_age", response_age);
  passtoArray(file, "response_last_modified", response_last_modified);
  passtoArray(file, "response_host", response_host);
  passtoArray(file, "response_status", response_status);
  passtoArray(file, "response_statusText", response_statusText);
  */
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
  passtoArray(fileList, "startedDateTime", startedDateTimes);
  passtoArray(fileList, "serverIPAddress", serverIPAddresses);
  passtoArray(fileList, "wait", timings_wait);
  passtoArray(fileList, "request_method", request_method);
  passtoArray(fileList, "request_url", request_url);
  passtoArray(fileList, "request_content_type", request_content_type);
  passtoArray(fileList, "request_cache_control", request_cache_control);
  passtoArray(fileList, "request_pragma", request_pragma);
  passtoArray(fileList, "request_expires", request_expires);
  passtoArray(fileList, "request_age", request_age);
  passtoArray(fileList, "request_last_modified", request_last_modified);
  passtoArray(fileList, "request_host", request_host);
  passtoArray(fileList, "response_content_type", response_content_type);
  passtoArray(fileList, "response_cache_control", response_cache_control);
  passtoArray(fileList, "response_pragma", response_pragma);
  passtoArray(fileList, "response_expires", response_expires);
  passtoArray(fileList, "response_age", response_age);
  passtoArray(fileList, "response_last_modified", response_last_modified);
  passtoArray(fileList, "response_host", response_host);
  passtoArray(fileList, "response_status", response_status);
  passtoArray(fileList, "response_statusText", response_statusText);
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
          case "request_expires":
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
                  "expires" ||
                fileContents.log.entries[j].request.headers[k].name ===
                  "Expires"
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
          case "request_age":
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
                fileContents.log.entries[j].request.headers[k].name === "age" ||
                fileContents.log.entries[j].request.headers[k].name === "Age"
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
          case "request_last_modified":
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
                  "last-modified" ||
                fileContents.log.entries[j].request.headers[k].name ===
                  "Last-Modified"
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
          case "request_host":
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
                  "host" ||
                fileContents.log.entries[j].request.headers[k].name === "Host"
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
          case "response_content_type":
            for (
              let k = 0;
              k < fileContents.log.entries[j].response.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].response.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].name == null ||
                fileContents.log.entries[j].response.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].response.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].value == null ||
                fileContents.log.entries[j].response.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].response.headers[k].name ===
                  "Content-Type" ||
                fileContents.log.entries[j].response.headers[k].name ===
                  "content-type"
              ) {
                console.log(
                  fileContents.log.entries[j].response.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].response.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "response_cache_control":
            for (
              let k = 0;
              k < fileContents.log.entries[j].response.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].response.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].name == null ||
                fileContents.log.entries[j].response.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].response.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].value == null ||
                fileContents.log.entries[j].response.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].response.headers[k].name ===
                  "Cache-Control" ||
                fileContents.log.entries[j].response.headers[k].name ===
                  "cache-control"
              ) {
                console.log(
                  fileContents.log.entries[j].response.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].response.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "response_pragma":
            for (
              let k = 0;
              k < fileContents.log.entries[j].response.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].response.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].name == null ||
                fileContents.log.entries[j].response.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].response.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].value == null ||
                fileContents.log.entries[j].response.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].response.headers[k].name ===
                  "pragma" ||
                fileContents.log.entries[j].response.headers[k].name ===
                  "Pragma"
              ) {
                console.log(
                  fileContents.log.entries[j].response.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].response.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "response_expires":
            for (
              let k = 0;
              k < fileContents.log.entries[j].response.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].response.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].name == null ||
                fileContents.log.entries[j].response.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].response.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].value == null ||
                fileContents.log.entries[j].response.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].response.headers[k].name ===
                  "expires" ||
                fileContents.log.entries[j].response.headers[k].name ===
                  "Expires"
              ) {
                console.log(
                  fileContents.log.entries[j].response.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].response.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "response_age":
            for (
              let k = 0;
              k < fileContents.log.entries[j].response.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].response.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].name == null ||
                fileContents.log.entries[j].response.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].response.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].value == null ||
                fileContents.log.entries[j].response.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].response.headers[k].name ===
                  "age" ||
                fileContents.log.entries[j].response.headers[k].name === "Age"
              ) {
                console.log(
                  fileContents.log.entries[j].response.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].response.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "response_last_modified":
            for (
              let k = 0;
              k < fileContents.log.entries[j].response.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].response.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].name == null ||
                fileContents.log.entries[j].response.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].response.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].value == null ||
                fileContents.log.entries[j].response.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].response.headers[k].name ===
                  "last-modified" ||
                fileContents.log.entries[j].response.headers[k].name ===
                  "Last-Modified"
              ) {
                console.log(
                  fileContents.log.entries[j].response.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].response.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "response_host":
            for (
              let k = 0;
              k < fileContents.log.entries[j].response.headers.length;
              k++
            ) {
              if (
                typeof fileContents.log.entries[j].response.headers[k].name ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].name == null ||
                fileContents.log.entries[j].response.headers[k].name == ""
              ) {
                console.log(++count);
                array_of_element.push(null);
              } else if (
                typeof fileContents.log.entries[j].response.headers[k].value ==
                  "undefined" ||
                fileContents.log.entries[j].response.headers[k].value == null ||
                fileContents.log.entries[j].response.headers[k].value == ""
              ) {
                array_of_element.push(null);
              } else if (
                fileContents.log.entries[j].response.headers[k].name ===
                  "host" ||
                fileContents.log.entries[j].response.headers[k].name === "Host"
              ) {
                console.log(
                  fileContents.log.entries[j].response.headers[k].value
                );
                array_of_element.push(
                  fileContents.log.entries[j].response.headers[k].value
                );
              }
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "response_status":
            if (
              typeof fileContents.log.entries[j].response.status ==
                "undefined" ||
              fileContents.log.entries[j].response.status == null ||
              fileContents.log.entries[j].response.status == ""
            ) {
              console.log(++count);
              array_of_element.push(null);
            } else {
              console.log(fileContents.log.entries[j].response.status);
              array_of_element.push(
                fileContents.log.entries[j].response.status
              );
            }
            if (j === fileContents.log.entries.length - 1) {
              console.log(
                "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
              );
            }
            break;
          case "response_statusText":
            if (
              typeof fileContents.log.entries[j].response.statusText ==
                "undefined" ||
              fileContents.log.entries[j].response.statusText == null ||
              fileContents.log.entries[j].response.statusText == ""
            ) {
              console.log(++count);
              array_of_element.push(null);
            } else {
              console.log(fileContents.log.entries[j].response.statusText);
              array_of_element.push(
                fileContents.log.entries[j].response.statusText
              );
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
