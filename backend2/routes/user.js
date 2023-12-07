// userRouter.js
const express = require("express");
const router = express.Router();

const { Register, Login, Logout, getUserDetails } = require("../controllers/userController");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").post(Logout);


module.exports = router;
