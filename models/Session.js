const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add Session"],
  },
  startDate: {
    type: String,
    required: [true, "Please add Start Date"],
  },
  endDate: {
    type: String,
    required: [true, "Please add End Date"],
  },
  status: {
    type: String,
    enum: ["InProgress", "UpComing"],
    default: "UpComing",
  },
  days: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Session", SessionSchema);
