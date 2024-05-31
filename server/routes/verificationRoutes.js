const express = require("express");
const { verifyOrder } = require("../controllers/verificationController");

const router = express.Router();

router.post("/verify", verifyOrder);

module.exports = router;
