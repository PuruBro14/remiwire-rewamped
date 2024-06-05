const axios = require("axios");
const Order = require("../models/Order");

exports.createPayment = async (req, res) => {
  console.log('-->req,user',req.body);
  const userId=req.user.id
  try {
    const orderId = "TORID665456" + Date.now();
    const customerId = "CID89898" + Date.now();
    const options = {
      method: "POST",
      url: "https://sandbox.cashfree.com/pg/orders",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-client-id": process.env.CLIENT_ID,
        "x-client-secret": process.env.CLIENT_SECRET,
        "x-api-version": "2022-09-01",
      },
      data: {
        customer_details: {
          customer_id: customerId,
          customer_email: "purusharma1405@gmail.com",
          customer_phone: "7498608775",
          customer_name: "goku",
        },
        order_meta: {
          notify_url:
            "https://webhook.site/99b1bf89-@bbc-4c0d-ad03-abcd1240c321",
          payment_methods: "cc,dc,upi,nb,paylater",
        },
        order_amount: 1,
        order_id: orderId,
        order_currency: "INR",
        order_note: "Remiwire order",
      },
    };

    const response = await axios.request(options);
    console.log(response.data);

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
      orderNote: "Remiwire order",
    });

    await newOrder.save();

    return res.status(200).send(response.data);
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
