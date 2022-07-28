const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/users/login", userController.login);
router.post("/users/sign-up", userController.signUp);

module.exports = router;
