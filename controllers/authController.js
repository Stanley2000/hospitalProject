const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const Staff = require("../models/staffModel");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.createStaff = catchAsync(async (req, res, next) => {
  const staff = await Staff.create(req.body);
  res.status(201).json({
    status: "success",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;
  const staff = await Staff.findOne({ password, email });

  if (!staff) return next(new AppError("Invalid password  or email", 403));

  res.status(200).json({
    status: "success",
    data: {
      token: signToken(staff._id),
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return next(new AppError("You don't have access to this route", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = Staff.findById(decoded.id);
  if (!currentUser)
    return next(new AppError("The user with this token no longer exist", 403));

  next();
});
