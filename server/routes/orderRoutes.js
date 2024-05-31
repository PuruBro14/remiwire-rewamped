const express = require("express");
const {
  getAllOrders,
  getUserOrders,
} = require("../controllers/orderController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/orders", getAllOrders);
router.get("/userOrders", auth, getUserOrders);

module.exports = router;
