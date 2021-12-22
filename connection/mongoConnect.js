const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnect;
