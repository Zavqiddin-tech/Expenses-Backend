const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const categoryInvestController = require("../../controller/category/categoryInvest.controller");

router.get("/getAll", authorization, categoryInvestController.getAll);
router.post("/create", authorization, categoryInvestController.create);

module.exports = router;
