// userRouter.js
const express = require("express");
const router = express.Router();

// Add getOrderHistory to the imported controllers
const { Register, Login, Logout, getUserDetails, getOrderHistory } = require("../controllers/userController");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").post(Logout);
router.route("/user/:userId/order-history").get(getOrderHistory); // New route for order history

module.exports = router;
