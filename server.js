const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set('strictQuery', true)
const DB_HOST = process.env.DB_HOST;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000)
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
