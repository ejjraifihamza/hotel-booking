const mongoose = require("mongoose");

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    type: {
      type: String,
    },
    price: {
      type: Number,
    },
    hotel_name: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "Hotel",
    },
    imagesRoom: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "disponible",
    },
    availableDate: {
      type: Date,
      default: null,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = Room;
