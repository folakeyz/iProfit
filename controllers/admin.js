const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Admin = require("../models/Admin");

// @desc    Create Admin/SuperAdmin
// @route   POST/api/v1/auth/admin/register
// @access   Private/Admin
exports.createAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.create(req.body);
  res.status(201).json({
    success: true,
    data: admin,
  });
});

// @desc    Get Admin/SuperAdmin
// @route   POST/api/v1/auth/admin/register
// @access   Private/Admin
exports.getAdmin = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Login User
// @route   POST/api/v1/auth/admin/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please Provide an email and password", 400));
  }
  //check for user
  const admin = await Admin.findOne({ email: email }).select("+password");

  if (!admin) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //check if password match
  const isMatch = await admin.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(admin, 200, res);
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
  const admin = await Admin.findById(req.admin.id);
  res.status(200).json({
    success: true,
    data: admin,
  });
});

//Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
  //create token
  const token = admin.getSignedJwtToken();

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

// @desc    Update Admin Profile
// @route   PUT/api/v1/auth/me/:id
// @access   Private

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobile: req.body.mobile,
  };

  const admin = await Admin.findByIdAndUpdate(req.admin.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: admin,
  });
});

// @desc    Update Admin Profile
// @route   PUT/api/v1/auth/me/:id
// @access   Private

exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id);

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
  file.name = `photo_${admin._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`An error occured while uploading`, 500));
    }
    await Admin.findByIdAndUpdate(req.admin.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

// @desc    Delete Admin
// @route   DELTE/api/v1/admin/:id
// @access   Private/Admin
exports.deleteAdmin = asyncHandler(async (req, res, next) => {
  await Admin.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
