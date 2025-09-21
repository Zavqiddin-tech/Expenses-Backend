const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const categoryExpensesController = require("../../controller/category/categoryExpenses.controller");

router.get("/getAll/:id", authorization, categoryExpensesController.getAll);
router.get("/getOne/:id", authorization, categoryExpensesController.getOne);
router.post("/create/:id", authorization, categoryExpensesController.create);

module.exports = router;
