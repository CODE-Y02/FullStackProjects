// import required modules
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

// db pool
const sequelize = require("./utils/database");

// import models
const Expense = require("./models/Expanse");

// create express app
const app = express();

app.use(cors());

//parse json req
app.use(bodyParser.json());

// request handling starts

// get --> "/expenses" -- > get all expenses
app.get("/expenses", (req, res) => {
  Expense.findAll()
    .then((allexpenses) => {
      res.json(allexpenses);
    })
    .catch((err) => {
      console.log("error in get all EXPENSE", err);
      res.status(500).json(err);
    });
});

// post --> "/expenses" --> add new Expense
app.post("/expenses", (req, res) => {
  let expObj = {
    type: req.body.type,
    amount: req.body.amount,
    description: req.body.description,
  };

  console.log(req.body);
  Expense.create(expObj)
    .then((newExpense) => {
      res.json(newExpense);
    })
    .catch((err) => {
      console.log("error in post EXPENSE", err);
      res.status(500).json(err);
    });
});

//PUT --> "/expenses/:id" --> edit expense

// delete --> "/expenses/:id" --> delete expense

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
