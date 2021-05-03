const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    companyName: {
      type: String,
      lowercase: true,
    },
    vatNumber: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
      lowercase: true,
    },
    zipcode: {
      type: Number,
    },
    city: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      maxlength: 9,
    },
    active: {
      type: Boolean,
    },

    bankAccount: {
      type: String,
      maxlength: 24,
    },

    creditCard: {
      type: String,
      maxlength: 16,
    },
    monthExpirationDate: {
      type: Number,
    },
    yearExpirationDate: {
      type: Number,
    },

    cars: [{
        type: mongoose.Types.ObjectId,
        ref: 'Car'
    }]
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("BusinessInvestor", UserSchema);

module.exports = model;
