const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const balansController = require("../controller/balans.controller");

router.get("/get-all", authorization, balansController.getAll);

module.exports = router;
