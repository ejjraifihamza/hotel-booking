const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

async function connect() {
  await mongoose.connect(process.env.DB_CONNECT);
  console.log("Connected")
}

module.exports = connect;