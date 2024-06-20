const express = require("express");
const { auth, isAdminRole, adminAuth } = require("../middlewares/auth");
const {
  fetchAllOrders,
  fetchAllUsers,
} = require("../controllers/admin/orders/getAllOrders.controller");
const {getOrderById, getOrderByServiceType,updateOrderStatusById, getOrderOfForexCurrency, getSpecificUserOrders}=require("../controllers/admin/orders/getOrderById.controller");
const adminRouter = express.Router();


adminRouter.get("/fetchAllOrders", adminAuth, fetchAllOrders);
adminRouter.get("/fetchOrderById/:id", adminAuth, getOrderById);
adminRouter.get("/fetchOrderByServiceType/:serviceType", adminAuth, getOrderByServiceType);
adminRouter.get("/fetchOrderByForexType/:forexCurrency",adminAuth,getOrderOfForexCurrency);
adminRouter.get("/fetchAllUsers", adminAuth, fetchAllUsers);
adminRouter.put("/updateOrder/:id", adminAuth, updateOrderStatusById);
adminRouter.get("/users/:userId/orders", getSpecificUserOrders);
// adminRouter.delete("/deleteOrderById/:id", auth, isAdminRole, deleteOrderById);

module.exports = adminRouter;

