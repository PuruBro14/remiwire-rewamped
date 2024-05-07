const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  sendotp,
} = require("../controllers/Auth");

router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending OTP to the user's email
// router.post("/sendotp", sendotp);

module.exports = router;