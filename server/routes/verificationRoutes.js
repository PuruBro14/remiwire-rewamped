const express = require("express");
const { verifyOrder } = require("../controllers/verificationController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/verify",auth, verifyOrder);

module.exports = router;
