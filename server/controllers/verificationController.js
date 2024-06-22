const axios = require("axios");
const { Cashfree } = require("cashfree-pg");
const Order = require("../models/Order");
const Remitter = require("../models/Remitter");
const Beneficiary = require("../models/Beneficiary");

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

const generateOrderId = (prefix) => {
  const randomNumber = Math.floor(Math.random() * 10000); 
  const timestamp = Date.now(); 
  return `${prefix}${timestamp}${randomNumber}`;
};

exports.verifyOrder = async (req, res) => {
  const userId=req.user.id;
  const customerId = generateOrderId("CID"); 
      console.log("userId-dsssssssss------>", userId);

  try {
    let { orderId, serviceType, amount } = req.body;
    console.log("orderId", orderId, serviceType, customerId);

    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);

    const remitter = await Remitter.findOne({})
    const beneficiary = await Beneficiary.findOne({});
    console.log("remitter", remitter, "beneficiary", beneficiary);

    console.log("userId------->", userId);

    const newOrder = new Order({
      orderId: orderId,
      customerId: customerId,
      user: userId,
      orderStatus: "Paid",
      orderDate: new Date(),
      orderAmount: amount || 1,
      currency: "INR",
      paymentMethod: "Credit Card",
      shippingAddress: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        postalCode: "62701",
        country: "USA",
      },
      billingAddress: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        postalCode: "62701",
        country: "USA",
      },
      orderNote: "Remiwire order1",
      serviceType: serviceType,
      remitter: remitter._id,
      beneficiary: beneficiary._id,
    });

    await newOrder.save();

    const populatedOrder = await Order.findById(newOrder._id)
      .populate("user", "firstName lastName email contactNumber")

    res.json(populatedOrder);

    await Order.save();
  } catch (error) {
    console.error('erorrrrrrrrrrrrrrrrrrrr->',error.message);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the order." });
  }
};
