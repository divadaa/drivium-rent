const mongoose = require("mongoose");

const CarStockSchema = require("./Stock");

const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    pickup: {
      type: Date,
      required: true,
    },
    return: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ["paid", "pending-payment"],
      default: "pending-payment",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Booking", BookingSchema);

module.exports = model;
