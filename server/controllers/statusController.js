const axios = require("axios");

exports.getOrderStatus = async (req, res) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const orderid = req.params.orderid;

  console.log("Endpoint hit with orderid:", orderid);

  const options = {
    method: "GET",
    url: `https://sandbox.cashfree.com/pg/orders/${orderid}`,
    headers: {
      accept: "application/json",
      "x-api-version": "2022-09-01",
      "x-client-id": client_id,
      "x-client-secret": client_secret,
    },
  };

  try {
    const response = await axios.request(options);
    const orderStatus = response.data.order_status;

    console.log(
      "Response received:",
      response.data,
      "order_status:",
      orderStatus
    );

    if (orderStatus === "PAID") {
      console.log("Order status: PAID");
      res.json({ status: "success", message: "Order is paid." });
    } else if (orderStatus === "ACTIVE") {
      console.log("Order status: ACTIVE");
      res.json({
        status: "redirect",
        data: response.data,
        message: "Order is active, please redirect.",
      });
    } else {
      console.log("Order status: FAILED");
      res.json({ status: "failed", message: "Order has failed." });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the order status." });
  }
};
