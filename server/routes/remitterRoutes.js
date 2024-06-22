const express = require("express");
const {
  registerRemitter,
  getRemitter,
} = require("../controllers/remitterController");
const { auth } = require("../middlewares/auth");
const Remitter = require("../models/Remitter");
const axios = require("axios");

const router = express.Router();

router.post("/registerRemitter",auth,registerRemitter);
router.get("/remitters/:remitterID",auth, getRemitter);

router.get("/remitterDetails/:remitterID", async (req, res) => {
  const { remitterID } = req.params;

  try {
    const remitterData = await Remitter.findOne({ remitter_id: remitterID });

    if (!remitterData) {
      return res.status(404).json({ error: "Remitter not found" });
    }

    console.log("remitterData", remitterData);

    const pancardImageURL = remitterData.pancardImage;
    const passportImageUrl = remitterData.passportImage;
    const imageResponse = await axios.get(pancardImageURL, {
      responseType: "arraybuffer",
    });
    const passportImageResponse = await axios.get(passportImageUrl, {
      responseType: "arraybuffer",
    });
    const base64Image = Buffer.from(imageResponse.data, "binary").toString(
      "base64"
    );

    const passportBase64Image = Buffer.from(
      passportImageResponse.data,
      "binary"
    ).toString("base64");

    remitterData.pancardImage = base64Image;
    res.json({ success: true, data: remitterData });
  } catch (error) {
    console.error("Error fetching remitter details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching remitter details" });
  }
});

module.exports = router;
