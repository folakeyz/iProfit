const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Admin = require("../models/Admin");
const Subject = require("../models/Subject");
const Student = require("../models/Student");
const Centre = require("../models/Centre");
const Instructor = require("../models/Instructor");

// @desc    get Logs
// @route   POST/api/v1/auth/admin/register
// @access   Private/Admin
exports.AdminLogs = asyncHandler(async (req, res, next) => {
  const sadmin = await Admin.find({ role: "SuperAdmin" });
  const admin = await Admin.find({ role: "Admin" });
  const centre = await Centre.find();
  const student = await Student.find();
  const instructor = await Instructor.find();
  const subject = await Subject.find();
  const myAdmin = await Admin.find({ role: "Admin", centre: req.admin.centre });
  const myStudent = await Student.find({ centre: req.admin.centre });
  const myInstructor = await Instructor.find({ centre: req.admin.centre });
  const mySubject = await Subject.find({ centre: req.admin.centre });

  res.status(201).json({
    success: true,
    sadmin: (sadmin && sadmin.length) || 0,
    admin: (admin && admin.length) || 0,
    centre: (centre && centre.length) || 0,
    student: (student && student.length) || 0,
    instructor: (instructor && instructor.length) || 0,
    trade: (subject && subject.length) || 0,
    myCentre: {
      myInstructor: (myInstructor && myInstructor.length) || 0,
      myStudent: (myStudent && myStudent.length) || 0,
      myAdmin: (myAdmin && myAdmin.length) || 0,
      myTrade: (mySubject && mySubject.length) || 0,
    },
  });
});
