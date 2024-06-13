const OrderModel = require("../../../models/Order");
const { formatDate } = require("../../../utils/utility");

const updateOrderStatusById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body;

    if (!orderId || !orderStatus) {
      return res.status(400).json({
        success: false,
        message: "Invalid request. Order ID and order status are required.",
      });
    }

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
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
        order?.serviceType !== undefined ? order.serviceType : "HARDCODE",
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

module.exports = updateOrderStatusById;
