const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const auditorblock = require("../../middleware/auditorblock.middleware");
const categoryInvestController = require("../../controller/category/categoryInvest.controller");

router.get("/getAll", authorization, categoryInvestController.getAll);
router.get("/getOne/:id", authorization, categoryInvestController.getOne);
router.post("/create", authorization, auditorblock, categoryInvestController.create);
router.patch("/:id", authorization, auditorblock, categoryInvestController.update);

module.exports = router;
