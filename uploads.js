"use strict";
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
  let count = 0;
  for (let i = 0; i < file.length; i++) {
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
    let currentfilepickreader = fileReader.readAsText(file[i]);
  }
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
