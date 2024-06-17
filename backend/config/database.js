const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB up!');
  } catch (error) {
    console.log(`DB error: ${error}`);
  }
}

module.exports = connectDB;