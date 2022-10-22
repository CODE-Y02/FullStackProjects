// import required modules
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

// db pool
const sequelize = require("./utils/database");

// import models
const Expense = require("./models/Expanse");
const { where } = require("sequelize");

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
// get --> "/expenses/:id" -- > get single expenses
app.get("/expenses/:id", (req, res) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      console.log("error in get  EXPENSE", err);
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

  //   console.log(req.body);
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
app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => {
      expense.type = req.body.type;
      expense.amount = req.body.amount;
      expense.description = req.body.description;

      return expense.save();
    })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      console.log("error in  EXPENSE", err);
      res.status(500).json(err);
    });
});

// delete --> "/expenses/:id" --> delete expense
app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;

  Expense.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      // console.log(result)
      res.status(200).end();
    })
    .catch((err) => {
      console.log("error in delete EXPENSE", err);
      res.status(500).json(err);
    });
});

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
