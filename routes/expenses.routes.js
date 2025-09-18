const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const expensesController = require("../controller/expenses.controller");

router.get("/getAll", authorization, expensesController.getAll);
router.post("/create", authorization, expensesController.create);

module.exports = router;
