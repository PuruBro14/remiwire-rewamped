const express = require("express");
const router = express.Router();
const beneficiaryController = require("../controllers/beneficiaryController");
const { auth } = require("../middlewares/auth");

router.post("/registerBeneficiary",auth,beneficiaryController.registerBeneficiary);

module.exports = router;
