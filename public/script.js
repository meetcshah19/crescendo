import axios from "axios";

function uploadAudio() {
  var audio = document.getElementById("audio");
  var formData = new FormData();
  formData.append("audio", audio.files[0], audio.files[0].name);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Your upload is successful..");
      document.getElementById("success-area").innerHTML =
        "File uploaded Successfully";
      document.getElementById("session-area").innerHTML =
        "Here is the id: " + xhr.response;
    } else {
      console.log("An error occurred during the upload. Try again.");
    }
  };
  // Send the data.
  xhr.send(formData);
}

function checkStatus() {
  console.log("Check!");
  axios.get("/status").then((response) => {
    console.log(response.data);
  });
}
