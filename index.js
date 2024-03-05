const mongoose = require("mongoose");

const express = require("express");
const app = express();
const port = 3000;
const uri =
  "mongodb+srv://selectmydeal1:riko1234@cluster0.hvk0hrl.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connect to mongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(3000, () => {
  console.log("server started on port 3000");
});

var switchGroups = document.querySelectorAll(".switch-flex");
var buttons = document.querySelectorAll(".button");

switchGroups.forEach(function (group) {
  group.addEventListener("click", function (event) {
    group.classList.toggle("green-bg");
  });
});

buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    switchGroups.forEach(function (group) {
      group.classList.remove("green-bg");
    });
  });
});
