const express = require("express");
const { uploadDocument } = require("../controllers/documentController");

const router = express.Router();

router.post("/upload-document/:orderid", uploadDocument);

module.exports = router;