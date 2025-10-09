const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const auditorblock = require("../middleware/auditorblock.middleware");
const investController = require("../controller/invest.controller");

router.get("/getAll", authorization, investController.getAll);
router.get("/getAllPay", authorization, investController.getAllPay);
router.post("/create/:id", authorization, auditorblock, investController.create);
router.patch("/:routeId/:payId", authorization, auditorblock, investController.update);

module.exports = router;
