const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");

const InstructorSchema = new mongoose.Schema({
  staffID: {
    type: String,
    required: [true, "Please add Staff ID"],
  },
  firstname: {
    type: String,
    required: [true, "Please add firstname"],
  },
  middlename: {
    type: String,
    required: [true, "Please add middlename"],
  },
  lastname: {
    type: String,
    required: [true, "Please add lastname"],
  },
  dob: {
    type: String,
    required: [true, "Please add Date of Birth"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: [true, "Please select Gender"],
  },
  email: {
    type: String,
    required: [true, "Please add Email"],
    unique: true,
  },
  mobile: {
    type: String,
    required: [true, "Please add Mobile"],
    unique: true,
  },

  role: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  lga: {
    type: String,
  },
  country: {
    type: String,
  },
  subjects: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    },
  ],
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
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
InstructorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//create location slug from the location
// InstructorSchema.pre("save", function (next) {
//   this.slug = slugify(this.location, { lower: true });
//   next();
// });

//match user entered password to hashed password in db
InstructorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//Sign JWT and return
InstructorSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("Instructor", InstructorSchema);
