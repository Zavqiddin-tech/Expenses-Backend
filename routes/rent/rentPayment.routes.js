const express = require("express");
const router = express.Router();
const authorization = require("../../middleware/auth.middleware");
const rentPaymentController = require("../../controller/rent/rentPayment.controller");

router.get("/getAll/:id", authorization, rentPaymentController.getAll);
router.post("/create/:id", authorization, rentPaymentController.create);
router.patch("/:payId", authorization, rentPaymentController.update);
router.delete("/:payId", authorization, rentPaymentController.deleteItem);

module.exports = router;
