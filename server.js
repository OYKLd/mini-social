const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API Mini Social Network");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});