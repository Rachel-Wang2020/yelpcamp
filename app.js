const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Campground = require("./models/campground");

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

//这行代码通常在您需要接收通过 POST 或 PUT 请求提交的表单数据时使用
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.get("/", (req, res) => {
  res.render("home");
});

// app.get("/makecampground", async (req, res) => {
//   const camp = new Campground({
//     title: "my Backyard",
//     description: "cheep camping"
//   });
//   await camp.save();
//   res.send(camp);
// });

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.post("/campgrounds", async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});
app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  res.redirect(`/campgrounds/${campground._id}`);
});
app.listen(3000, () => {
  console.log("Serving on port 3000");
});
