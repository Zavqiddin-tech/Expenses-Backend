const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const auditorblock = require("../../middleware/auditor.middleware");
const rentPaymentController = require("../../controller/rent/rentPayment.controller");

router.get("/getAll/:id", authorization, rentPaymentController.getAll);
router.post("/create/:id", authorization, rentPaymentController.create);
router.patch("/:payId", authorization, auditorblock, rentPaymentController.update);
router.delete("/:payId", authorization, auditorblock, rentPaymentController.deleteItem);

module.exports = router;
