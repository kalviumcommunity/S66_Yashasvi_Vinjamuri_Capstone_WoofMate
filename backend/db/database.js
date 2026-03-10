const mongoose = require("mongoose");
require("dotenv").config();
const config = {
  url: process.env.MONGOURL,
};
const connection = mongoose
  .connect(config.url)
  .then(() => {
    console.log("Database connected sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connection;
