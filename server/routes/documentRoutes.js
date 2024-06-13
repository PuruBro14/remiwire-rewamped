const express = require("express");
const { uploadDocument } = require("../controllers/documentController");
// const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/upload-document",uploadDocument);

module.exports = router;
