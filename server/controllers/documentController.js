const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Document = require("../models/Document");

exports.uploadDocument = async (req, res) => {
  const url = `https://sandbox.cashfree.com/pg/lrs/orders/documents/upload`;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const api_version = process.env.API_VERSION;

  try {
    if (!req.files || !req.files.customerPassportImage) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const {
      customerName,
      customerPassportNumber,
      placeOfIssue,
      issueDate,
      expireDate,
    } = req.body;
    const customerPassportImage = req.files.customerPassportImage;

    // Upload the file to Cloudinary
    const uploadedFile = await uploadImageToCloudinary(
      customerPassportImage,
      process.env.FOLDER_NAME
    );

    const fileData = fs.readFileSync(customerPassportImage.tempFilePath);

    const form = new FormData();
    form.append("files", fileData, "KYC_PASSPORT_STUDENT_1.jpeg");

    let response;
    try {
      response = await axios.post(url, form, {
        headers: {
          ...form.getHeaders(),
          "x-client-id": client_id,
          "x-client-secret": client_secret,
          "x-api-version": api_version,
        },
      });
    } catch (error) {
      console.error("Error making POST request:", error);
      throw new Error("Failed to make POST request");
    }

    console.log('response',response.data);

    try{
    const newDocument = new Document({
      customerName,
      customerPassportImage: uploadedFile.url,
      customerPassportNumber,
      placeOfIssue,
      issueDate,
      expireDate,
      createdAt: new Date(),
    });
    await newDocument.save();

    res.status(200).json(response.data);
  }catch(error){
    console.log("error in storing in db",error);
  }

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
