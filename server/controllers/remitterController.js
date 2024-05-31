const axios = require("axios");
const Remitter = require("../models/Remitter");

exports.registerRemitter = async (req, res) => {
  console.log("req----------->", req.body);
  const {
    purpose,
    account_number,
    ifsc,
    pan,
    remitter_id,
    name,
    address,
    phone_number,
    email,
    nationality,
    postal_code,
    state,
    city,
    bank,
  } = req.body;

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  try {
    const remitterData = {
      purpose,
      account_number,
      ifsc,
      pan,
      remitter_id,
      name,
      address,
      phone_number,
      email,
      nationality,
      postal_code,
      state,
      city,
      bank_code: bank,
    };

    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/lrs/remitters",
      remitterData,
      {
        headers: {
          "x-client-id": client_id,
          "x-client-secret": client_secret,
          "x-api-version": process.env.API_VERSION,
          "Content-Type": "application/json",
        },
      }
    );

    // Save the remitter data to the database
    const newRemitter = new Remitter(remitterData);
    await newRemitter.save();

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the remitter." });
  }
};

exports.getRemitter = async (req, res) => {
  const { remitterID } = req.params;
  console.log("Endpoint hit with remitterID:", remitterID);

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const options = {
    method: "GET",
    url: `https://sandbox.cashfree.com/pg/lrs/remitters/${remitterID}`,
    headers: {
      accept: "application/json",
      "x-api-version": "2022-09-01",
      "x-client-id": client_id,
      "x-client-secret": client_secret,
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Response received:", response.data);

    await Remitter.findOneAndUpdate(
      { remitter_id: remitterID },
      response.data,
      { upsert: true }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching remitter data." });
  }
};
