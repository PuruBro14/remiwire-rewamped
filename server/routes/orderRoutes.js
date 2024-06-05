const express = require("express");
const {
  getAllOrders,
  getUserOrders,
  getTrackingOrder,
} = require("../controllers/orderController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/orders", getAllOrders);
router.get("/userOrders", auth, getUserOrders);
router.get("/trackingorder",getTrackingOrder)

module.exports = router;
