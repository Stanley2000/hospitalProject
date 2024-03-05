const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Your first name is required"],
      validate: validator.isAlpha,
    },
    lastName: {
      type: String,
      required: ["true", "Your last name is required"],
      validate: validator.isAlpha,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide your phone number"],
      validate: {
        validator: function (value) {
          return /^[0-9]{11}$/.test(value);
        },
        message: "Please provide a valide number",
      },
    },
    email: {
      type: String,
      // required: [true, "Provide a valid email address"],
      validate: validator.isEmail,
    },
    // age: {
    //   type: Number,
    //   required: [true, "Please provide your age"],
    // },
    dateOfBirth: {
      type: Date,
      required: [true, "Provide your date of birth"],
    },
    maritalStatus: {
      type: String,
      required: [true, "Provide your marital status"],
      enum: ["single", "married"],
    },
    gender: {
      type: String,
      required: [true, "Please provide your gender"],
      enum: ["male", "female"],
    },
    patientID: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.virtual("records", {
  ref: "History",
  foreignField: "user",
  localField: "_id",
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.virtual("age").get(function () {
  return new Date().getFullYear() - this.dateOfBirth.getFullYear();
});

userSchema.statics.CalcTotalUsers = async function () {
  const total = await this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
      },
    },
  ]);

  if (total.length <= 0) {
    return 1000;
  } else {
    return 1000 + total[0].totalUsers;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
