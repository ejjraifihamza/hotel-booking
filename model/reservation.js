const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reserver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  payment_type: {
    type: String,
  },
  date_from: {
    type: String,
  },
  date_to: {
    type: String,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
