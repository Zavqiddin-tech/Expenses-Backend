const express = require("express");
const authorization = require("../middleware/auth.middleware");
const authController = require("../controller/auth.controller");

const router = express.Router();

router.post("/regis", authorization, authController.regis);
router.post("/login", authController.login);
router.get("/getAll", authorization, authController.getAll);
router.get("/checkuser", authorization, authController.checkUser);
router.get("/checkadmin", authorization, authController.checkAdmin);
// router.post("/logout", authController.logout);
// router.get("/refresh", authController.refresh);
// router.delete("/delete/:id", authorization, authController.deleteUser);

module.exports = router;
