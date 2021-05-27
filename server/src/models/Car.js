const mongoose = require('mongoose');

const { Schema } = mongoose;

const CarSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      lowercase: true
    },
    availability: {
      type: Boolean,
      required: true,
      default: true
    },
    plate: {
      type: String,
      required: true,
      lowercase: true
    },
    brand: {
      type: String,
      required: true,
      lowercase: true
    },
    model: {
      type: String,
      required: true,
      lowercase: true
    },

    info: {
      type: String,
      required: true,
    },

    fuelType: {
      type: String,
      required: true
    },
    pictures: [{ type: String }],
    extras: [
      {
        type: String
      }
    ],
    weight: {
      type: Number
    },
    weightType: {
      type: String
    },
    pricePerDay: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

const model = mongoose.model('Car', CarSchema);

module.exports = model;
