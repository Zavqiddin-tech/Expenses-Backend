const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const expensesController = require("../controller/expenses.controller");

router.get("/getAll", authorization, expensesController.getAll);
router.get(
  "/getByCategory/:id",
  authorization,
  expensesController.getByCategory
);
router.post("/create/:id", authorization, expensesController.create);
router.patch("/:id", authorization, expensesController.update);

module.exports = router;
