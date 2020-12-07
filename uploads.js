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

//This is for when the user clicks Upload File
const fileInput = document.getElementById("input");
const button = document.querySelector("button");
button.onclick = () => {
  fileInput.click();
};

//Fires when the contents of the object or selection have changed.
fileInput.onchange = () => {
  const selectedFiles = [...fileInput.files];
  let file = [];
  for (let i = 0; i < document.getElementById("input").files.length; i++) {
    file[i] = document.getElementById("input").files[i];
  }
  console.log(selectedFiles);
  async function proccessing_data() {
    //Kalo ti sunartisi pou dimiourgisa h opoia pairnei san eisodo to pinaka me ola ta files, to onoma ton dedomenon pou
    //theloume na parei apo to har file kai telos ton pinaka pou tha balei auta ta dedomena
    await passtoArray(file, "startedDateTime", startedDateTimes);
    await passtoArray(file, "serverIPAddress", serverIPAddresses);
    await passtoArray(file, "wait", timings_wait);
    await passtoArray(file, "request_method", request_method);
    await passtoArray(file, "request_url", request_url);
    await passtoArray(file, "request_content_type", request_content_type);
    await passtoArray(file, "request_cache_control", request_cache_control);
    await passtoArray(file, "request_pragma", request_pragma);
    await passtoArray(file, "request_expires", request_expires);
    await passtoArray(file, "request_age", request_age);
    await passtoArray(file, "request_last_modified", request_last_modified);
    await passtoArray(file, "request_host", request_host);
    await passtoArray(file, "response_content_type", response_content_type);
    await passtoArray(file, "response_cache_control", response_cache_control);
    await passtoArray(file, "response_pragma", response_pragma);
    await passtoArray(file, "response_expires", response_expires);
    await passtoArray(file, "response_age", response_age);
    await passtoArray(file, "response_last_modified", response_last_modified);
    await passtoArray(file, "response_host", response_host);
    await passtoArray(file, "response_status", response_status);
    await passtoArray(file, "response_statusText", response_statusText);
    console.log(response_expires[8]);
  }
  proccessing_data();
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
  event.stopPropagation();
  event.preventDefault();
  const fileList = event.dataTransfer.files;
  async function proccessing_drop_data() {
    await passtoArray(fileList, "startedDateTime", startedDateTimes);
    await passtoArray(fileList, "serverIPAddress", serverIPAddresses);
    await passtoArray(fileList, "wait", timings_wait);
    await passtoArray(fileList, "request_method", request_method);
    await passtoArray(fileList, "request_url", request_url);
    await passtoArray(fileList, "request_content_type", request_content_type);
    await passtoArray(fileList, "request_cache_control", request_cache_control);
    await passtoArray(fileList, "request_pragma", request_pragma);
    await passtoArray(fileList, "request_expires", request_expires);
    await passtoArray(fileList, "request_age", request_age);
    await passtoArray(fileList, "request_last_modified", request_last_modified);
    await passtoArray(fileList, "request_host", request_host);
    await passtoArray(fileList, "response_content_type", response_content_type);
    await passtoArray(
      fileList,
      "response_cache_control",
      response_cache_control
    );
    await passtoArray(fileList, "response_pragma", response_pragma);
    await passtoArray(fileList, "response_expires", response_expires);
    await passtoArray(fileList, "response_age", response_age);
    await passtoArray(
      fileList,
      "response_last_modified",
      response_last_modified
    );
    await passtoArray(fileList, "response_host", response_host);
    await passtoArray(fileList, "response_status", response_status);
    await passtoArray(fileList, "response_statusText", response_statusText);
    console.log(response_expires[8]);
  }
  proccessing_drop_data();
});

function passtoArray(files, name_of_element, array_of_element) {
  for (let i = 0; i < files.length; i++) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      let currentfilepickreader = fileReader.readAsText(files[i]);
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
                array_of_element.push(null);
              } else {
                array_of_element.push(
                  fileContents.log.entries[j].startedDateTime.match(
                    /\d\d\d\d-\d\d-\d\d/g
                  ) +
                    " " +
                    fileContents.log.entries[j].startedDateTime.match(
                      /\d\d:\d\d:\d\d/g
                    )
                );
              }
              resolve();
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
                array_of_element.push(null);
              } else {
                array_of_element.push(
                  fileContents.log.entries[j].serverIPAddress
                );
              }
              resolve();
              if (j === fileContents.log.entries.length - 1) {
                console.log(
                  "STOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP PRIN ITAN ARXEIO 1"
                );
              }
              break;
            case "wait":
              if (
                typeof fileContents.log.entries[j].timings.wait ==
                  "undefined" ||
                fileContents.log.entries[j].timings.wait == null ||
                fileContents.log.entries[j].timings.wait == ""
              ) {
                array_of_element.push(null);
              } else {
                array_of_element.push(fileContents.log.entries[j].timings.wait);
              }
              resolve();
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
                array_of_element.push(null);
              } else {
                array_of_element.push(
                  fileContents.log.entries[j].request.method
                );
              }
              resolve();
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
                array_of_element.push(null);
              } else {
                array_of_element.push(
                  fileContents.log.entries[j].request.url.match(
                    /(https:\/\/|http:\/\/)(\S*?\/)/g
                  )
                );
              }
              resolve();
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
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].request.headers[k].value ==
                    "undefined" ||
                  fileContents.log.entries[j].request.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].request.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].request.headers[k].name ===
                    "Content-Type" ||
                  fileContents.log.entries[j].request.headers[k].name ===
                    "content-type"
                ) {
                  array_of_element.push(
                    fileContents.log.entries[j].request.headers[k].value
                  );
                }
              }
              resolve();
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
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].request.headers[k].value ==
                    "undefined" ||
                  fileContents.log.entries[j].request.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].request.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].request.headers[k].name ===
                    "Cache-Control" ||
                  fileContents.log.entries[j].request.headers[k].name ===
                    "cache-control"
                ) {
                  array_of_element.push(
                    fileContents.log.entries[j].request.headers[k].value
                  );
                }
              }
              resolve();
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
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].request.headers[k].value ==
                    "undefined" ||
                  fileContents.log.entries[j].request.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].request.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].request.headers[k].name ===
                    "pragma" ||
                  fileContents.log.entries[j].request.headers[k].name ===
                    "Pragma"
                ) {
                  array_of_element.push(
                    fileContents.log.entries[j].request.headers[k].value
                  );
                }
              }
              resolve();
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
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].request.headers[k].value ==
                    "undefined" ||
                  fileContents.log.entries[j].request.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].request.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].request.headers[k].name ===
                    "expires" ||
                  fileContents.log.entries[j].request.headers[k].name ===
                    "Expires"
                ) {
                  let month = new Date(
                    fileContents.log.entries[j].request.headers[k].value
                      .match(/\d.+[^\D]/g)[0]
                      .split(/(?<=\d)\s(?=\d)/g)[0]
                      .match(/\d\d \w{3}/g)
                  );
                  month = month.getMonth() + 1;
                  array_of_element.push(
                    fileContents.log.entries[j].request.headers[k].value
                      .match(/\d.+[^\D]/g)[0]
                      .split(/(?<=\d)\s(?=\d)/g)[0]
                      .match(/\d{4}/g)[0] +
                      " " +
                      month +
                      " " +
                      fileContents.log.entries[j].request.headers[k].value
                        .match(/\d.+[^\D]/g)[0]
                        .split(/(?<=\d)\s(?=\d)/g)[0]
                        .match(/^\d\d/g) +
                      " " +
                      fileContents.log.entries[j].request.headers[k].value
                        .match(/\d.+[^\D]/g)[0]
                        .split(/(?<=\d)\s(?=\d)/g)[1]
                  );
                }
              }
              resolve();
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
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].request.headers[k].value ==
                    "undefined" ||
                  fileContents.log.entries[j].request.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].request.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].request.headers[k].name ===
                    "age" ||
                  fileContents.log.entries[j].request.headers[k].name === "Age"
                ) {
                  array_of_element.push(
                    fileContents.log.entries[j].request.headers[k].value
                  );
                }
              }
              resolve();
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
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].request.headers[k].value ==
                    "undefined" ||
                  fileContents.log.entries[j].request.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].request.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].request.headers[k].name ===
                    "last-modified" ||
                  fileContents.log.entries[j].request.headers[k].name ===
                    "Last-Modified"
                ) {
                  let month = new Date(
                    fileContents.log.entries[j].request.headers[k].value
                      .match(/\d.+[^\D]/g)[0]
                      .split(/(?<=\d)\s(?=\d)/g)[0]
                      .match(/\d\d \w{3}/g)
                  );
                  month = month.getMonth() + 1;
                  array_of_element.push(
                    fileContents.log.entries[j].request.headers[k].value
                      .match(/\d.+[^\D]/g)[0]
                      .split(/(?<=\d)\s(?=\d)/g)[0]
                      .match(/\d{4}/g)[0] +
                      " " +
                      month +
                      " " +
                      fileContents.log.entries[j].request.headers[k].value
                        .match(/\d.+[^\D]/g)[0]
                        .split(/(?<=\d)\s(?=\d)/g)[0]
                        .match(/^\d\d/g) +
                      " " +
                      fileContents.log.entries[j].request.headers[k].value
                        .match(/\d.+[^\D]/g)[0]
                        .split(/(?<=\d)\s(?=\d)/g)[1]
                  );
                  if (
                    k ===
                    fileContents.log.entries[j].request.headers.length - 1
                  ) {
                    for (let n = 0; n < array_of_element.length; n++) {
                      console.log(array_of_element[n]);
                    }
                  }
                }
              }
              resolve();
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
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].request.headers[k].value ==
                    "undefined" ||
                  fileContents.log.entries[j].request.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].request.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].request.headers[k].name ===
                    "host" ||
                  fileContents.log.entries[j].request.headers[k].name === "Host"
                ) {
                  array_of_element.push(
                    fileContents.log.entries[j].request.headers[k].value
                  );
                }
              }
              resolve();
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
                  fileContents.log.entries[j].response.headers[k].name ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].name == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].response.headers[k]
                    .value == "undefined" ||
                  fileContents.log.entries[j].response.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].response.headers[k].name ===
                    "Content-Type" ||
                  fileContents.log.entries[j].response.headers[k].name ===
                    "content-type"
                ) {
                  array_of_element.push(
                    fileContents.log.entries[j].response.headers[k].value
                  );
                }
              }
              resolve();
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
                  fileContents.log.entries[j].response.headers[k].name ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].name == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].response.headers[k]
                    .value == "undefined" ||
                  fileContents.log.entries[j].response.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].response.headers[k].name ===
                    "Cache-Control" ||
                  fileContents.log.entries[j].response.headers[k].name ===
                    "cache-control"
                ) {
                  array_of_element.push(
                    fileContents.log.entries[j].response.headers[k].value
                  );
                }
              }
              resolve();
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
                  fileContents.log.entries[j].response.headers[k].name ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].name == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].response.headers[k]
                    .value == "undefined" ||
                  fileContents.log.entries[j].response.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].response.headers[k].name ===
                    "pragma" ||
                  fileContents.log.entries[j].response.headers[k].name ===
                    "Pragma"
                ) {
                  array_of_element.push(
                    fileContents.log.entries[j].response.headers[k].value
                  );
                }
              }
              resolve();
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
                  fileContents.log.entries[j].response.headers[k].name ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].name == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].response.headers[k]
                    .value == "undefined" ||
                  fileContents.log.entries[j].response.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].response.headers[k].name ===
                    "expires" ||
                  fileContents.log.entries[j].response.headers[k].name ===
                    "Expires"
                ) {
                  let month = new Date(
                    fileContents.log.entries[j].response.headers[k].value
                      .match(/\d.+[^\D]/g)[0]
                      .split(/(?<=\d)\s(?=\d)/g)[0]
                      .match(/\d\d \w{3}/g)
                  );
                  month = month.getMonth() + 1;
                  array_of_element.push(
                    fileContents.log.entries[j].response.headers[k].value
                      .match(/\d.+[^\D]/g)[0]
                      .split(/(?<=\d)\s(?=\d)/g)[0]
                      .match(/\d{4}/g)[0] +
                      " " +
                      month +
                      " " +
                      fileContents.log.entries[j].response.headers[k].value
                        .match(/\d.+[^\D]/g)[0]
                        .split(/(?<=\d)\s(?=\d)/g)[0]
                        .match(/^\d\d/g) +
                      " " +
                      fileContents.log.entries[j].response.headers[k].value
                        .match(/\d.+[^\D]/g)[0]
                        .split(/(?<=\d)\s(?=\d)/g)[1]
                  );
                }
              }
              resolve();
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
                  fileContents.log.entries[j].response.headers[k].name ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].name == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].response.headers[k]
                    .value == "undefined" ||
                  fileContents.log.entries[j].response.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].response.headers[k].name ===
                    "age" ||
                  fileContents.log.entries[j].response.headers[k].name === "Age"
                ) {
                  array_of_element.push(
                    fileContents.log.entries[j].response.headers[k].value
                  );
                }
              }
              resolve();
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
                  fileContents.log.entries[j].response.headers[k].name ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].name == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].response.headers[k]
                    .value == "undefined" ||
                  fileContents.log.entries[j].response.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].response.headers[k].name ===
                    "last-modified" ||
                  fileContents.log.entries[j].response.headers[k].name ===
                    "Last-Modified"
                ) {
                  let month = new Date(
                    fileContents.log.entries[j].response.headers[k].value
                      .match(/\d.+[^\D]/g)[0]
                      .split(/(?<=\d)\s(?=\d)/g)[0]
                      .match(/\d\d \w{3}/g)
                  );
                  month = month.getMonth() + 1;
                  array_of_element.push(
                    fileContents.log.entries[j].response.headers[k].value
                      .match(/\d.+[^\D]/g)[0]
                      .split(/(?<=\d)\s(?=\d)/g)[0]
                      .match(/\d{4}/g)[0] +
                      " " +
                      month +
                      " " +
                      fileContents.log.entries[j].response.headers[k].value
                        .match(/\d.+[^\D]/g)[0]
                        .split(/(?<=\d)\s(?=\d)/g)[0]
                        .match(/^\d\d/g) +
                      " " +
                      fileContents.log.entries[j].response.headers[k].value
                        .match(/\d.+[^\D]/g)[0]
                        .split(/(?<=\d)\s(?=\d)/g)[1]
                  );
                }
              }
              resolve();
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
                  fileContents.log.entries[j].response.headers[k].name ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].name == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  typeof fileContents.log.entries[j].response.headers[k]
                    .value == "undefined" ||
                  fileContents.log.entries[j].response.headers[k].value ==
                    null ||
                  fileContents.log.entries[j].response.headers[k].value == ""
                ) {
                  array_of_element.push(null);
                } else if (
                  fileContents.log.entries[j].response.headers[k].name ===
                    "host" ||
                  fileContents.log.entries[j].response.headers[k].name ===
                    "Host"
                ) {
                  array_of_element.push(
                    fileContents.log.entries[j].response.headers[k].value
                  );
                }
              }
              resolve();
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
                array_of_element.push(null);
              } else {
                array_of_element.push(
                  fileContents.log.entries[j].response.status
                );
              }
              resolve();
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
                array_of_element.push(null);
              } else {
                array_of_element.push(
                  fileContents.log.entries[j].response.statusText
                );
              }
              resolve();
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
    });
  }
}
