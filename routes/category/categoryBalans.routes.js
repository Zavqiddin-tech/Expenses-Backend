const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const categoryBalansController = require("../../controller/category/categoryBalans.controller");

router.get("/getAll", authorization, categoryBalansController.getAll);
router.post("/create", authorization, categoryBalansController.create);

module.exports = router;
