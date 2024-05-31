const express = require("express");
const { getFxRate } = require("../controllers/fxRateController");

const router = express.Router();

router.post("/fx-rate", getFxRate);

module.exports = router;
