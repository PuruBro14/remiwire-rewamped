const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  landmark: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const AddressModel = mongoose.model("address", addressSchema);

module.exports = AddressModel;
