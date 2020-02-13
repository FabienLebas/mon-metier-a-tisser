const express = require('express');
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;

app.use("/static", express.static('build/static'));

app.get("/favicon.ico", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/favicon.ico"));
});

app.get("/robots.txt", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/robots.txt"));
});

app.get("*", function (request, result) {
  result.sendFile(__dirname + "/build/index.html");
});

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
