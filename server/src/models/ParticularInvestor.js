const { Schema, model } = require("mongoose");

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
    vatNumber: { type: String, lowercase: true },
    address: { type: String, lowercase: true },
    zipcode: { type: Number },
    city: { type: String, lowercase: true },
    bankAccount: { type: String, maxlength: 24 },
    creditCard: { type: String, maxlength: 16 },
    monthExpirationDate: { type: Number },
    yearExpirationDate: { type: Number },
    cars: [{
        type: mongoose.Types.ObjectId,
        ref: 'Car'
    }]
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

const model = model("ParticularInvestor", userSchema);
module.exports = model;
