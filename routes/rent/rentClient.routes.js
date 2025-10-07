const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const rentClientController = require("../../controller/rent/rentClient.controller");

router.get("/getAll", authorization, rentClientController.getAll);
router.get("/getOne/:id", authorization, rentClientController.getOne);
router.post("/create", authorization, rentClientController.create);
router.patch("/:id", authorization, rentClientController.update);

module.exports = router;
