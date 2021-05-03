require('dotenv').config();
const express = require('express');

const app = express();


const PORT = 3000;

app.get("/", (req, res) => {
  console.info("request");
  res.send("Hello, drivium!");
});

app.post("/", (req, res) => {
  res.send("post, request");
});

app.listen(PORT, () => {
  console.info(`> listening on port ${PORT}`);
});
