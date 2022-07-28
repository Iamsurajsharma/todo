const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/users/login", userController.login);
router.get("/users/sign-up", userController.signUp);

module.exports = router;
