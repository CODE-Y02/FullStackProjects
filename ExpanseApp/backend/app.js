// import required modules
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

// db pool
const sequelize = require("./utils/database");

// import routes
const expenseRoute = require("./routes/expense");

// create express app
const app = express();

app.use(cors());

//parse json req
app.use(bodyParser.json());

// request handling starts

app.use("/", expenseRoute);

// sync all models

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// made avail at port
app.listen(3000);
