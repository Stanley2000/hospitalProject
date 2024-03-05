const mongoose = require("mongoose");

const medHistorySchema = mongoose.Schema(
  {
    cheifComplaint: {
      type: String,
    },
    historyOfPresenIllness: {
      syptoms: String,
      duration: String,
      severity: String,
    },
    physicalExaminationFindings: {
      bodyTemperature: Number,
      heartBeat: Number,
      respirationRate: Number,
    },
    diagnosticTest: String,
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [
        true,
        "A medical history must have a patient it is associated with",
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const History = mongoose.model("History", medHistorySchema);

module.exports = History;
