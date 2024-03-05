const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
