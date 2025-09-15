const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth.middleware");
const categoryController = require("../controller/category.controller");

router.get("/get-all", authorization, categoryController.getAll);
router.post("/create", authorization, categoryController.create);

module.exports = router;
