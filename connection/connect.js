const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

async function connect() {
  await mongoose.connect('mongodb://localhost:27017/hotel-booking');
}

module.exports = connect;
