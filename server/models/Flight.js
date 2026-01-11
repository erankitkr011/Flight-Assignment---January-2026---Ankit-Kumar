const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flightId: {
      type: String,
      required: true,
      unique: true,
    },
    airline: {
      type: String,
      required: true,
    },
    departureCity: {
      type: String,
      required: true,
    },
    arrivalCity: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 2000,
      max: 3000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", flightSchema);
