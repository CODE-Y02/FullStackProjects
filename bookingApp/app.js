const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// get  --> localhost
app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// get  --> /bookings

app.get("/bookings", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
  next();
});

sequelize
  .sync()
  .then((result) => {
    //   console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000);
