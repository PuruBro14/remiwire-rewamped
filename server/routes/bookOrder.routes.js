const express = require("express");
const bookRoute = express.Router();
const bookOrderController = require("../controllers/bookController");
const SecureAuth = require("../middleware/jwtVerify");
const { auth } = require("../middlewares/auth");

bookRoute.post("/createOrder",auth,bookOrderController.createBookOrders);
bookRoute.get("/fetchAllBookOrders",auth, bookOrderController.getAllOrders);
bookRoute.get(
  "/fetchBookOrderById/:id",
  bookOrderController.getOrderDetailsById
);
bookRoute.put("/updateBookOrders/:id", bookOrderController.updateOrderDetails);
bookRoute.delete(
  "/deleteOrderById/:id",
  bookOrderController.deleteOrderDetails
);

module.exports = bookRoute;
