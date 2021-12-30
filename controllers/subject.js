const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Subject = require("../models/Subject");

// @desc    Create Subject
// @route   POST/api/v1/subject
// @access   Private/Admin
exports.createSubject = asyncHandler(async (req, res, next) => {
  req.body.class = req.body.sclass;
  const subject = await Subject.create(req.body);
  res.status(201).json({
    success: true,
    data: subject,
  });
});

// @desc    Get ALL Subject
// @route   GET/api/v1/Subject
// @access   Private/Admin
exports.getSubject = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Trade
// @route   POST/api/v1/subject
// @access   Private/Admin
exports.getSubjectByCentre = asyncHandler(async (req, res, next) => {
  const subject = await Subject.find({ centre: req.admin.centre })
    .populate({ path: "centre", select: "name" })
    .populate({
      path: "instructor",
      select: "firstname lastname",
    });
  res.status(201).json({
    success: true,
    data: subject,
  });
});

// @desc    Update Subject
// @route   PUT/api/v1/Subject/:id
// @access   Private

exports.updateSubject = asyncHandler(async (req, res, next) => {
  const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: subject,
  });
});

// @desc    Get SubjectBy ID
// @route   GET/api/v1/Subject/:id
// @access   Private/Admin
exports.getSubjectById = asyncHandler(async (req, res, next) => {
  const subject = await Subject.findById(req.params.id);
  res.status(201).json({
    success: true,
    data: subject,
  });
});

// @desc    UPDATE SubjectBy ID
// @route   PUT/api/v1/Subject/:id
// @access   Private/Admin
exports.deleteSubjectById = asyncHandler(async (req, res, next) => {
  const subject = await Subject.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    data: subject,
  });
});

// @desc    Get SubjectBy Class
// @route   GET/api/v1/Subject/:id
// @access   Private/Admin
exports.getSubjectByClass = asyncHandler(async (req, res, next) => {
  const subject = await Subject.findOne({ class: req.params.id });
  res.status(201).json({
    success: true,
    data: subject,
  });
});
