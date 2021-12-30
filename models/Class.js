const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add class"],
    unique: true,
  },
  centre: {
    type: mongoose.Schema.ObjectId,
    ref: "Centre",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
