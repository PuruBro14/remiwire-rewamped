const Order = require("../models/Order");
const BookModel = require("../models/bookOrder.model");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const userOrders = await Order.find({ user: userId }).sort({
      createdAt: -1,
    });

    const SendMoneyAbroad = userOrders.filter(
      (order) => order.serviceType === "SendMoneyAbroad"
    );

    const NRIRepatriation = userOrders.filter(
      (order) => order.serviceType === "NRIRepatriation"
    );

    const BlockedAccountPayment = userOrders.filter(
      (order) => order.serviceType === "BlockedAccountPayment"
    );

    const GICAccountPayment = userOrders.filter(
      (order) => order.serviceType === "GICAccountPayment"
    );

    const OverseasEducationLoan = userOrders.filter(
      (order) => order.serviceType === "OverseasEducationLoan"
    );

    res.status(200).json({
      success: true,
      data: {
        SendMoneyAbroad,
        NRIRepatriation,
        BlockedAccountPayment,
        GICAccountPayment,
        OverseasEducationLoan,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user orders",
      error: error.message,
    });
  }
};

exports.getAdminOrders = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.id;

    let filter = {};

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      filter = { createdAt: { $gte: startDate, $lte: endDate } };
    }

    const userOrders = await Order.find(filter).sort({ createdAt: -1 });

    const ForexCurrencyExchangeOrders=await BookModel.find(filter).sort({createdAt:-1})

    const SendMoneyAbroad = userOrders.filter(
      (order) => order.serviceType === "SendMoneyAbroad"
    );

    const ForexCurrencyExchange = ForexCurrencyExchangeOrders;

    const NRIRepatriation = userOrders.filter(
      (order) => order.serviceType === "NRIRepatriation"
    );

    const BlockedAccountPayment = userOrders.filter(
      (order) => order.serviceType === "BlockedAccountPayment"
    );

    const GICAccountPayment = userOrders.filter(
      (order) => order.serviceType === "GICAccountPayment"
    );

    res.status(200).json({
      success: true,
      data: {
        SendMoneyAbroad,
        ForexCurrencyExchange,
        NRIRepatriation,
        BlockedAccountPayment,
        GICAccountPayment
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user orders",
      error: error.message,
    });
  }
};


exports.getTrackingOrder = async (req, res) => {
  try {
    const { orderId } = req.query;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId query parameter is required",
      });
    }

    console.log("orderId", orderId);

    const order = await Order.findOne(orderId);

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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the order",
      error: error.message,
    });
  }
};
