const mongoose = require("mongoose");

const RemitterSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  remitter_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  purpose: {
    type: String,
    trim: true,
  },
  account_number: {
    type: String,
    trim: true,
  },
  ifsc: {
    type: String,
    trim: true,
  },
  pan: {
    type: String,
    trim: true,
  },
  pancardImage: {
    type: String,
    trim: true,
  },
  passportImage: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  phone_number: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  nationality: {
    type: String,
    trim: true,
  },
  postal_code: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  bank_code: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Remitter", RemitterSchema);
