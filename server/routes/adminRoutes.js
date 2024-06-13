const express = require("express");
const { auth, isAdminRole } = require("../middlewares/auth");
const {
  fetchAllOrders,
  fetchAllUsers,
} = require("../controllers/admin/orders/getAllOrders.controller");
const {getOrderById}=require("../controllers/admin/orders/getOrderById.controller")
const adminRouter = express.Router();


adminRouter.get("/fetchAllOrders", auth, fetchAllOrders);
adminRouter.get("/fetchOrderById/:id", auth, getOrderById);
adminRouter.get("/fetchAllUsers", auth, fetchAllUsers);
// adminRouter.put("/updateOrder/:id", auth, isAdminRole, updateOrderById);
// adminRouter.delete("/deleteOrderById/:id", auth, isAdminRole, deleteOrderById);

module.exports = adminRouter;

