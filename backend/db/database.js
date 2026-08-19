const mongoose = require("mongoose");
require("dotenv").config();
const config = {
  url: process.env.MONGODB_URI,
};

if (!config.url) {
  throw new Error("Missing MongoDB connection string. Set MONGOURL or MONGODB_URI.");
}

const connection = mongoose
  .connect(config.url)
  .then(() => {
    console.log("Database connected sucessfully!!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connection;
