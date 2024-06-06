const axios = require("axios");
const FormData = require("form-data");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.uploadDocument = async (req, res) => {
  const url = `https://sandbox.cashfree.com/pg/lrs/orders/documents/upload`;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const api_version = process.env.API_VERSION;

  try {
    if (!req.files || !req.files.files) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const file = req.files.files;
    console.log("file", file.name);

    const uploadedFile = await uploadImageToCloudinary(
      file.tempFilePath,
      process.env.FOLDER_NAME
    );
    console.log("Uploaded file URL:", uploadedFile.url);

    const form = new FormData();
    form.append("file", uploadedFile.url);

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
