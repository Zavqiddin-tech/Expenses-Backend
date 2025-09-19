const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const categoryExpensesController = require("../../controller/category/categoryExpenses.controller");

router.get("/getAll", authorization, categoryExpensesController.getAll);
router.post("/create/:id", authorization, categoryExpensesController.create);

module.exports = router;
