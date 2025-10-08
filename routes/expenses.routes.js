const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const auditorblock = require("../middleware/auditor.middleware");
const expensesController = require("../controller/expenses.controller");

router.get("/getAll", authorization, expensesController.getAll);
router.get(
  "/getByCategory/:id",
  authorization,
  expensesController.getByCategory
);
router.post("/create/:id", authorization, auditorblock, expensesController.create);
router.patch("/:id", authorization, auditorblock, expensesController.update);
router.delete("/:id", authorization, auditorblock, expensesController.deleteItem)

module.exports = router;
