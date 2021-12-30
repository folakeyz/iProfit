const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add Trade"],
  },
  code: {
    type: String,
    required: [true, "Please add Trade Code"],
  },
  class: {
    type: mongoose.Schema.ObjectId,
    ref: "Class",
    required: true,
  },
  centre: {
    type: mongoose.Schema.ObjectId,
    ref: "Centre",
    required: true,
  },
  type: {
    type: String,
    enum: ["Core", "Elective"],
    default: "Core",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subject", SubjectSchema);
