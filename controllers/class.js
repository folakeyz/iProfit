const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Class = require("../models/Class");

// @desc    Create Admin/SuperAdmin
// @route   POST/api/v1/class
// @access   Private/Admin
exports.createClass = asyncHandler(async (req, res, next) => {
  const newclass = await Class.create(req.body);
  res.status(201).json({
    success: true,
    data: newclass,
  });
});

// @desc    Get ALL Class
// @route   GET/api/v1/class
// @access   Private/Admin
exports.getClass = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Update Class
// @route   PUT/api/v1/class/:id
// @access   Private

exports.update = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.class,
  };
  const updateClass = await Class.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: updateClass,
  });
});

// @desc    Get ClassBy ID
// @route   GET/api/v1/class/:id
// @access   Private/Admin
exports.getClassById = asyncHandler(async (req, res, next) => {
  const newclass = await Class.findById(req.params.id);
  res.status(201).json({
    success: true,
    data: newclass,
  });
});

// @desc    UPDATE ClassBy ID
// @route   PUT/api/v1/class/:id
// @access   Private/Admin
exports.deleteClassById = asyncHandler(async (req, res, next) => {
  const newclass = await Class.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    data: newclass,
  });
});
