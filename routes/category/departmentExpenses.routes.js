const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const auditorblock = require("../../middleware/auditor.middleware");
const departmentExpensesController = require("../../controller/category/departmentExpenses.controller");

router.get("/getAll", authorization, departmentExpensesController.getAll);
router.post("/create", authorization, auditorblock, departmentExpensesController.create);
router.patch("/:id", authorization, auditorblock, departmentExpensesController.update);

module.exports = router;
