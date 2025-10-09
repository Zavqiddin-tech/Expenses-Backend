const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const auditorblock = require("../../middleware/auditorblock.middleware");
const rentClientController = require("../../controller/rent/rentClient.controller");

router.get("/getAll", authorization, rentClientController.getAll);
router.get("/getOne/:id", authorization, rentClientController.getOne);
router.post("/create", authorization, auditorblock, rentClientController.create);
router.patch("/:id", authorization, auditorblock, rentClientController.update);

module.exports = router;
