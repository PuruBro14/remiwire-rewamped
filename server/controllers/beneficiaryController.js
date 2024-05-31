const axios = require("axios");
const Beneficiary = require("../models/Beneficiary");

exports.registerBeneficiary = async (req, res) => {
  const {
    beneficiary_id,
    account_holder_name,
    account_number,
    swift_code,
    iban,
    bank_name,
    bank_country,
    bank_address,
    address,
    city,
    state,
    country,
    postal_code,
    routing_number,
  } = req.body;

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const api_version = process.env.API_VERSION;

  if (!client_id || !client_secret || !api_version) {
    return res.status(500).json({
      error:
        "Server configuration error: Missing required environment variables.",
    });
  }

  if (
    !beneficiary_id ||
    !account_holder_name ||
    !account_number ||
    !bank_name ||
    !bank_country ||
    !bank_address ||
    !address ||
    !city ||
    !state ||
    !country ||
    !postal_code ||
    !routing_number
  ) {
    return res.status(400).json({
      error: "Validation error: Missing required fields.",
    });
  }

  const beneficiaryData = {
    beneficiary_id,
    account_holder_name,
    account_number,
    swift_code,
    iban,
    bank_name,
    bank_country,
    bank_address,
    address,
    city,
    state,
    country,
    postal_code,
    routing_number,
  };

  try {
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/lrs/beneficiaries",
      beneficiaryData,
      {
        headers: {
          "x-client-id": client_id,
          "x-client-secret": client_secret,
          "x-api-version": api_version,
          "Content-Type": "application/json",
        },
      }
    );

    const newBeneficiary = new Beneficiary(beneficiaryData);
    await newBeneficiary.save();

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error registering beneficiary:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the beneficiary." });
  }
};
