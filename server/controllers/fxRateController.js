const axios = require("axios");

exports.getFxRate = async (req, res) => {
  const {
    to_amount,
    to_currency,
    purpose,
    education_loan,
    customer_declaration,
    sender_pan_number,
  } = req.body;

  if (!to_amount || !to_currency || !purpose) {
    return res.status(400).json({
      error:
        "Validation error: Missing required fields or incorrect data types.",
    });
  }

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const api_version = process.env.API_VERSION;

  if (!client_id || !client_secret || !api_version) {
    return res.status(500).json({
      error:
        "Server configuration error: Missing required environment variables.",
    });
  }

  const fxRateData = {
    to_amount,
    to_currency,
    purpose,
    education_loan,
    customer_declaration,
    pan: sender_pan_number || undefined,
  };

  try {
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/lrs/fx-rate/details",
      fxRateData,
      {
        headers: {
          "x-client-id": client_id,
          "x-client-secret": client_secret,
          "x-api-version": api_version,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching FX rate details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching FX rate details.",message:error });
  }
};
