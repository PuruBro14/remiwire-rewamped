const mongoose = require("mongoose");
const Order = require("../../../models/Order");
const { formatDate } = require("../../../utils/utility");

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findOne({orderId:orderId})

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

exports.getOrderByServiceType = async (req, res) => {
  try {
    const serviceType = req.params.serviceType;

    const pipeline = [
      { $match: { serviceType: serviceType } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          orderId: 1,
          placedBy: { $concat: ["$user.firstName", " ", "$user.lastName"] },
          orderType: { $ifNull: ["$serviceType", "HARDCODE"] },
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          estimatedDelivery: {
            $dateToString: { format: "%Y-%m-%d", date: "$orderDate" },
          },
          status: "$orderStatus",
        },
      },
    ];

    const orders = await Order.aggregate(pipeline);

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching order by service type:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

exports.updateOrderStatusById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body;

    if (!orderId || !orderStatus) {
      return res.status(400).json({
        success: false,
        message: "Invalid request. Order ID and order status are required.",
      });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: orderId },
      { orderStatus },
      { new: true }
    ).populate("user");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order not found.`,
      });
    }

    const orderInfo = {
      orderId: order.orderId,
      placedBy: `${order.user.firstName} ${order.user.lastName}`,
      orderType:
        order.serviceType !== undefined ? order.serviceType : "HARDCODE",
      createdAt: formatDate(order.createdAt),
      estimatedDelivery: formatDate(order.orderDate),
      status: order.orderStatus,
    };

    return res.status(200).json({
      success: true,
      message: `Order status updated successfully.`,
      data: orderInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error.`,
      error: error.message,
    });
  }
};
