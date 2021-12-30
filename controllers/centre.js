const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Centre = require("../models/Centre");

// @desc    Create Centre
// @route   POST/api/v1/Centre
// @access   Private/Admin
exports.createCentre = asyncHandler(async (req, res, next) => {
  const centre = await Centre.create(req.body);
  res.status(201).json({
    success: true,
    data: centre,
  });
});

// @desc    Get ALL Centre
// @route   GET/api/v1/Centre
// @access   Private/Admin
exports.getCentre = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Update Centre
// @route   PUT/api/v1/Centre/:id
// @access   Private

exports.update = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.centre,
  };
  const updateCentre = await Centre.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: updateCentre,
  });
});

// @desc    Get CentreBy ID
// @route   GET/api/v1/Centre/:id
// @access   Private/Admin
exports.getCentreById = asyncHandler(async (req, res, next) => {
  const centre = await Centre.findById(req.params.id);
  res.status(201).json({
    success: true,
    data: centre,
  });
});

// @desc    UPDATE CentreBy ID
// @route   PUT/api/v1/Centre/:id
// @access   Private/Admin
exports.deleteCentreById = asyncHandler(async (req, res, next) => {
  const centre = await Centre.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    data: centre,
  });
});
