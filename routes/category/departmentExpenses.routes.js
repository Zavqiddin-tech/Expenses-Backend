const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const departmentExpensesController = require("../../controller/category/departmentExpenses.controller");

router.get("/getAll", authorization, departmentExpensesController.getAll);
router.post("/create", authorization, departmentExpensesController.create);

module.exports = router;
