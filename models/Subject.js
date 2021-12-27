const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add Subject"],
  },
  class: {
    type: mongoose.Schema.ObjectId,
    ref: "Class",
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
