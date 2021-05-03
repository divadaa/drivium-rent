


const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
    },

    password: { type: String, required: true },
    googleId: { type: String },
    licenceNumber: { type: String, lowercase: true },
    monthExpirationLicence: { type: Number },
    yearExpirationLicence: { type: Number },
    address: { type: String, lowercase: true },
    zipcode: { type: Number },
    city: { type: String, lowercase: true },
    creditCard: { type: String, maxlength: 16 },
    monthExpirationDate: { type: Number },
    yearExpirationDate: { type: Number },
  },

  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.googleId;
      },
    },
  }
);



const User = mongoose.model('User', userSchema);
module.exports = User;
