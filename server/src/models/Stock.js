const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarStockSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car'
    },
    quantity: { type: Number }
  },
  {
    timestamps: true
  }
);

module.exports = CarStockSchema;
