const axios = require("axios");

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
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the order." });
  }
};
