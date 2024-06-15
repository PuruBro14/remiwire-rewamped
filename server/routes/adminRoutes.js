const express = require("express");
const { auth, isAdminRole, adminAuth } = require("../middlewares/auth");
const {
  fetchAllOrders,
  fetchAllUsers,
} = require("../controllers/admin/orders/getAllOrders.controller");
const {getOrderById, getOrderByServiceType}=require("../controllers/admin/orders/getOrderById.controller")
const adminRouter = express.Router();


adminRouter.get("/fetchAllOrders", adminAuth, fetchAllOrders);
adminRouter.get("/fetchOrderById/:id", adminAuth, getOrderById);
adminRouter.get("/fetchOrderByServiceType/:serviceType", adminAuth, getOrderByServiceType);
adminRouter.get("/fetchAllUsers", adminAuth, fetchAllUsers);
// adminRouter.put("/updateOrder/:id", auth, isAdminRole, updateOrderById);
// adminRouter.delete("/deleteOrderById/:id", auth, isAdminRole, deleteOrderById);

module.exports = adminRouter;

