const axios = require("axios");
const { Cashfree } = require("cashfree-pg");
const Order = require("../models/Order");

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
  try {
    let { orderId, serviceType } = req.body;
    console.log("orderId", orderId,serviceType,customerId);

    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    res.json(response.data);

    const newOrder = new Order({
      orderId: orderId,
      customerId: customerId,
      user: userId,
      orderStatus: "Paid",
      orderDate: new Date(),
      orderAmount: 1,
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
    });

    await newOrder.save();
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the order." });
  }
};
