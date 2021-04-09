const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoUri");

const dbConnect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected...");
  } catch (err) {
    console.log(err.message);
    process.exit(1); //exit when process fails
  }
};
module.exports = dbConnect;
