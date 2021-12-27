const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Session = require("../models/Session");

// @desc    Create Session
// @route   POST/api/v1/session
// @access   Private/Admin
exports.createSession = asyncHandler(async (req, res, next) => {
  const session = await Session.create(req.body);
  res.status(201).json({
    success: true,
    data: session,
  });
});

// @desc    Get ALL Session
// @route   GET/api/v1/session
// @access   Private/Admin
exports.getSession = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Update Session
// @route   PUT/api/v1/session/:id
// @access   Private

exports.updateSession = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.session,
  };
  const session = await Session.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: session,
  });
});

// @desc    Get SessionBy ID
// @route   GET/api/v1/Session/:id
// @access   Private/Admin
exports.getSessionById = asyncHandler(async (req, res, next) => {
  const session = await Session.findById(req.params.id);
  res.status(201).json({
    success: true,
    data: session,
  });
});

// @desc    UPDATE SessionBy ID
// @route   PUT/api/v1/Session/:id
// @access   Private/Admin
exports.deleteSessionById = asyncHandler(async (req, res, next) => {
  const session = await Session.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    data: session,
  });
});
