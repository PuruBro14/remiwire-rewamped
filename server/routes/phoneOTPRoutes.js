const express = require("express");
const { sendPhoneOtp } = require("../controllers/sendPhoneOTP");

const router = express.Router();

router.post("/send-otp", sendPhoneOtp);
router.post("/verify-otp", sendPhoneOtp);

module.exports = router;
