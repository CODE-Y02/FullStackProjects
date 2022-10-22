const Expense = require("../models/Expanse");

module.exports.getAll = (req, res) => {
  Expense.findAll()
    .then((allexpenses) => {
      res.json(allexpenses);
    })
    .catch((err) => {
      console.log("error in get all EXPENSE", err);
      res.status(500).json(err);
    });
};

module.exports.getById = (req, res) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      console.log("error in get  EXPENSE", err);
      res.status(500).json(err);
    });
};

module.exports.postAddExpense = (req, res) => {
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
};

module.exports.putEditExpense = (req, res) => {
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
};

module.exports.deleteById = (req, res) => {
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
};
