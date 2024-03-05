const catchAsync = require("../utils/catchAsync");
const History = require("../models/medicalHistoryModel");
const AppError = require("../utils/appError");

exports.createMedicalRecord = catchAsync(async (req, res, next) => {
  req.body.user = req.params.patientID;

  const newRecord = await History.create(req.body);

  res.status(200).json({
    status: "sucess",
    data: {
      newRecord,
    },
  });
});
