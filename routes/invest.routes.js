const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const investController = require("../controller/invest.controller");

router.get("/get-all", authorization, investController.getAll);
router.invest("/create", authorization, investController.create);

module.exports = router;
