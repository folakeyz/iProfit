const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");

const StudentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add name"],
  },
  middlename: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    required: [true, "Please add name"],
  },
  email: {
    type: String,
    required: [true, "Please add Email"],
    unique: true,
  },
  centre: {
    type: mongoose.Schema.ObjectId,
    ref: "Centre",
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  photo: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//Encrypt password using bcrypt
StudentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//create location slug from the location
// StudentSchema.pre("save", function (next) {
//   this.slug = slugify(this.location, { lower: true });
//   next();
// });

//match user entered password to hashed password in db
StudentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//Sign JWT and return
StudentSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("Student", StudentSchema);
