const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const reportController = require("../controller/report.controller");

router.get("/this-month", authorization, reportController.thisMonth);

module.exports = router;
