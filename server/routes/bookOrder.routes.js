const express = require("express");
const bookRoute = express.Router();
const bookOrderController = require("../controllers/bookController");
const SecureAuth = require("../middleware/jwtVerify");

bookRoute.post("/createOrder",bookOrderController.createBookOrders);
bookRoute.get("/fetchAllBookOrders", bookOrderController.getAllOrders);
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
