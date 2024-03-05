const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routers/userRoutes");
const globalErrorController = require("./controllers/errorController");
const authRoute = require("./routers/authRoutes");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api/v1/login')
app.use("/api/v1/staff", authRoute);
app.use("/api/v1/users", userRoute);
app.use(globalErrorController);

module.exports = app;