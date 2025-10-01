const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const rentCategoryController = require("../../controller/rent/rentCategory.controller");

router.get("/getAll", authorization, rentCategoryController.getAll);
router.get("/getOne/:id", authorization, rentCategoryController.getOne);
router.post("/create", authorization, rentCategoryController.create);
router.patch("/:id", authorization, rentCategoryController.update);

module.exports = router;
