const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
//设置视图引擎ejs
app.set("view engine", "ejs");
//设置视图文件目录
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});
app.listen(3000, () => {
  console.log("Serving on port 3000");
});
