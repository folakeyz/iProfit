const mongoose = require("mongoose");

const CentreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add Centre"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Centre", CentreSchema);
