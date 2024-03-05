const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const History = require("../models/medicalHistoryModel");
dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.DATABASE).then((conn) => {
  console.log("Connected to DATABASE successfully");
});

const history = JSON.parse(
  fs.readFileSync(`${__dirname}/medHist.json`, "utf-8")
);

const importData = async () => {
  try {
    await History.create(history);

    console.log("Data successfully loaded to DB");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == "--import") importData();
