const express = require("express");
const { getOrderStatus } = require("../controllers/statusController");

const router = express.Router();

router.get("/status/:orderid", getOrderStatus);

module.exports = router;
