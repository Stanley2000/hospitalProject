const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createUser = catchAsync(async (req, res, next) => {
  const ans = await User.CalcTotalUsers();
  const newPatient = { patientID: ans, ...req.body };
  const user = await User.create(newPatient);

  res.status(201).json({
    status: "sucess",
    data: {
      user,
    },
  });
});

exports.getAllPatients = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    status: "success",
    totalUsers: users.length,
    data: {
      Patients: users,
    },
  });
});
exports.getPatientDetails = catchAsync(async (req, res, next) => {
  const { patientID } = req.params;
  const patientDetails = await User.findById(patientID).populate("records");

  res.status(200).json({
    status: "success",
    data: {
      patientDetails,
    },
  });
});
