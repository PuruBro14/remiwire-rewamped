const OrderModel = require("../../../models/Order");

const deleteOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request. Order ID is required.",
      });
    }

    const order = await OrderModel.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Order deleted successfully.`,
      data: { orderId: order._id },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error.`,
      error: error.message,
    });
  }
};

module.exports = deleteOrderById;
