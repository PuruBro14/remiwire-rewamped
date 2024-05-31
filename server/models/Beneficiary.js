const mongoose = require("mongoose");

const BeneficiarySchema = new mongoose.Schema({
  beneficiary_id: { type: String, required: true, unique: true },
  account_holder_name: { type: String, required: true },
  account_number: { type: String, required: true },
  swift_code: String,
  iban: String,
  bank_name: { type: String, required: true },
  bank_country: { type: String, required: true },
  bank_address: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String, required: true },
  routing_number: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Beneficiary", BeneficiarySchema);
