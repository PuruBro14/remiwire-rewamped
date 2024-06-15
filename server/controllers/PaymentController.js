const axios = require("axios");
const Order = require("../models/Order");

const generateOrderId = (prefix) => {
  const randomNumber = Math.floor(Math.random() * 10000); // Generate a random 4-digit number
  const timestamp = Date.now(); // Get the current timestamp
  return `${prefix}${timestamp}${randomNumber}`;
};

exports.createPayment = async (req, res) => {
  const userId = req.user.id;
  const { serviceType } = req.body; 
  console.log('req.body',req.body,serviceType);
  try {
    const orderId = generateOrderId("TORID"); 
    const customerId = generateOrderId("CID"); 
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

    return res.status(200).send(response.data);
  } catch (error) {
    console.error("Internal server error----------------------<:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
