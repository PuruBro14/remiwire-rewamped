const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  currentRate: {
    type: Number,
    required: true,
    trim: true,
  },
});

const bookSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      trim: true,
    },
    customerId: {
      type: String,
      trim: true,
    },
    currencies: [currencySchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("bookorder", bookSchema);

module.exports = BookModel;
