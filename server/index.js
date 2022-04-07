// server.js
// where your node app starts

// dotenv config
require("dotenv").config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const API_KEY = process.env.GOOGLE_API_KEY;

const path = require("path");

// init project
const express = require("express");
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "/public")));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/dist/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(
    `Your app is listening on port ${
      listener.address().port
    } or on http://localhost:${listener.address().port}`
  );
});
