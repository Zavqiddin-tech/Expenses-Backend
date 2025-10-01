const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const rentBalansController = require("../../controller/rent/rentBalans.controller");

router.get("/getAll", authorization, rentBalansController.getAll);
// router.post("/create", authorization, rentBalansController.create);

module.exports = router;
