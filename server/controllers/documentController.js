const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

exports.uploadDocument = async (req, res) => {
  const orderId = req.params.orderid;
  console.log("orderId", orderId);

  const url = `https://sandbox.cashfree.com/pg/lrs/orders/${orderId}/documents/upload`;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const api_version = process.env.API_VERSION;
  const filePath = path.join(
    __dirname,
    "../../../Downloads/KYC_PASSPORT_STUDENT_1.pdf"
  );

  try {
    const form = new FormData();
    form.append("files", fs.createReadStream(filePath));

    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
        "x-client-id": client_id,
        "x-client-secret": client_secret,
        "x-api-version": api_version,
      },
    });

    console.log("Response:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
