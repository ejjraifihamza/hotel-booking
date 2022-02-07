const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

async function connect() {
  await mongoose.connect(process.env.DB_CONNECT);
}

module.exports = connect;
