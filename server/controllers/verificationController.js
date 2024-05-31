const axios = require("axios");
const { Cashfree } = require("cashfree-pg");

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
exports.verifyOrder = async (req, res) => {
  try {
    let { orderId } = req.body;
    console.log("orderId", orderId);

    Cashfree.PGOrderFetchPayments("2023-08-01", orderId)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
        return res.status(500).json({
          error:"there is issue while verifying the order"
        })
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the order." });
  }
};
