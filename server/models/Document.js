const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerPassportImage: {
    type: String,
    required: true,
  },
  customerPassportNumber: {
    type: String,
    required: true,
  },
  placeOfIssue: {
    type: String,
    required: true,
  },
  issueDate: {
    type: String,
    required: true,
  },
  expireDate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", DocumentSchema);
