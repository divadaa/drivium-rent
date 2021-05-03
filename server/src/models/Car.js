const mongoose = require("mongoose");

const CarSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      lowercase: true,
    },
    availability: {
      type: Boolean,
      required: true,
      default: true
    },
    plate: {
      type: String,
      required: true,
      lowercase: true,
    },
    brand: {
      type: String,
      required: true,
      lowercase: true,
    },
    model: {
      type: String,
      required: true,
      lowercase: true,
    },

    fuelType: {
      type: Number,
      required: true,
      lowercase: true,
    },
    pictures: [{ type: String }],
    extras: [{
      type: String,
    }],
    weight: {
      type: Number,
    },
    weightType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Car", CarSchema);

module.exports = model;
