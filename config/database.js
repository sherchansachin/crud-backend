const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(conInstance.connection.host);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
