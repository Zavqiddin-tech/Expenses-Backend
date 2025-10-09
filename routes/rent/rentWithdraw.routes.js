const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const auditorBlock = require("../../middleware/auditorblock.middleware");
const director = require("../../middleware/director.middleware");
const admin = require("../../middleware/admin.middleware");
const rentWithdrawController = require("../../controller/rent/rentWithdraw.controller");

router.get("/getAll", authorization, rentWithdrawController.getAll);
router.post("/create", authorization, auditorBlock, director, rentWithdrawController.create);
router.delete("/:payId", authorization, auditorBlock, admin, rentWithdrawController.deleteItem);

module.exports = router;
