const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Student = require("../models/Student");

// @desc    Create Student/SuperStudent
// @route   POST/api/v1/auth/Student/register
// @access   Private/Student
exports.createStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.create(req.body);
  res.status(201).json({
    success: true,
    data: student,
  });
});

// @desc    Get Student/SuperStudent
// @route   POST/api/v1/auth/Student/register
// @access   Private/Student
exports.getStudent = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Login User
// @route   POST/api/v1/auth/Student/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please Provide an email and password", 400));
  }
  //check for user
  const student = await Student.findOne({ email: email }).select("+password");

  if (!student) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //check if password match
  const isMatch = await student.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(student, 200, res);
});

// @desc    Log user out / clear cookie
// @route  GET /api/v1/auth/logout
// @access   Private

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get current logged in user
// @route   POST/api/v1/auth/me
// @access   Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.student.id);
  res.status(200).json({
    success: true,
    data: student,
  });
});

//Get token from model, create cookie and send response
const sendTokenResponse = (student, statusCode, res) => {
  //create token
  const token = student.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

// @desc    Update Student Profile
// @route   PUT/api/v1/auth/me/:id
// @access   Private

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.student.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: student,
  });
});

// @desc    Update Student Profile
// @route   PUT/api/v1/auth/me/:id
// @access   Private

exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.student.id);

  if (!req.files) {
    return next(new ErrorResponse(`Please Upload a picture`, 400));
  }

  const file = req.files.file;

  //Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please Upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please Upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  //crete custom filename
  file.name = `photo_${student._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`An error occured while uploading`, 500));
    }
    await Student.findByIdAndUpdate(req.student.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

// @desc    Delete Student
// @route   DELTE/api/v1/Student/:id
// @access   Private/Student
exports.deleteStudent = asyncHandler(async (req, res, next) => {
  await Student.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
