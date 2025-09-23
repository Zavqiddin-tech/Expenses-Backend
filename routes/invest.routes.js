const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const investController = require("../controller/invest.controller");

router.get("/getAll", authorization, investController.getAll);
router.get("/getAllPay", authorization, investController.getAllPay);
router.post("/create/:id", authorization, investController.create);
router.patch("/:routeId/:payId", authorization, investController.update);

module.exports = router;
