const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const investController = require("../controller/invest.controller");

router.get("/getAll", authorization, investController.getAll);
router.get("/getAll-pay", authorization, investController.getAllPay);
router.post("/create", authorization, investController.create);

module.exports = router;
