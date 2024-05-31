const mongoose = require("mongoose");

const RemitterSchema = new mongoose.Schema({
  remitter_id: { type: String, required: true, unique: true },
  purpose: String,
  account_number: String,
  ifsc: String,
  pan: String,
  name: String,
  address: String,
  phone_number: String,
  email: String,
  nationality: String,
  postal_code: String,
  state: String,
  city: String,
  bank_code: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Remitter", RemitterSchema);
