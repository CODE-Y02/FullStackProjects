const express = require("express");

const expenseController = require("../controllers/expense");

const router = express.Router();

// get --> "/expenses" -- > get all expenses
router.get("/expenses", expenseController.getAll);

// get --> "/expenses/:id" -- > get single expenses

router.get("/expenses/:id", expenseController.getById);

// post --> "/expenses" --> add new Expense
router.post("/expenses", expenseController.postAddExpense);

//PUT --> "/expenses/:id" --> edit expense
router.put("/expenses/:id", expenseController.putEditExpense);

// delete --> "/expenses/:id" --> delete expense
router.delete("/expenses/:id", expenseController.deleteById);

module.exports = router;
