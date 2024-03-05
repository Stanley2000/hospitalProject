const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const port = process.env.port;
const DB = process.env.DATABASE;
mongoose.connect(DB).then((con) => {
  console.log("Connected to the DATABASE");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
