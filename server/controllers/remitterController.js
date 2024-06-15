const axios = require("axios");
const Remitter = require("../models/Remitter");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.registerRemitter = async (req, res) => {
  console.log('req.user.id',req.user);
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
    bank_code,
  } = req.body;

  // const { pancardImage, passportImage } = req?.files; 

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  try {
    const requiredFields = [
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
      bank_code,
      // pancardImage,
      // passportImage,
    ];

    console.log('requiredFields',requiredFields);

    const missingFields = requiredFields.filter((field) => !field);
    console.log("missingFields", missingFields);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
        missingFields,
      });
    }

    // const pancardImgUpload = await uploadImageToCloudinary(
    //   pancardImage,
    //   process.env.FOLDER_NAME
    // );
    // const passportImgUpload = await uploadImageToCloudinary(
    //   passportImage,
    //   process.env.FOLDER_NAME
    // );

    const remitterData = {
      userId: req.user.id, 
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
      bank_code: bank_code,
      // pancardImage: pancardImgUpload.url,
      // passportImage: passportImgUpload.url,
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

    const newRemitter = new Remitter(remitterData);
    await newRemitter.save();

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while registering the remitter.",
      error: error.message,
    });
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

    const remitterData = {
      remitter_id: response.data.remitter_id,
      purpose: response.data.purpose,
      account_number: response.data.account_number,
      ifsc: response.data.ifsc,
      pan: response.data.pan,
      // pancardImage: response.data.pancardImage,
      // passportImage: response.data.passportImage,
      name: response.data.name,
      address: response.data.address,
      phone_number: response.data.phone_number,
      email: response.data.email,
      nationality: response.data.nationality,
      postal_code: response.data.postal_code,
      state: response.data.state,
      city: response.data.city,
      bank_code: response.data.bank_code,
    };

    await Remitter.findOneAndUpdate({ remitter_id: remitterID }, remitterData, {
      upsert: true,
      new: true,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching remitter data." });
  }
};
