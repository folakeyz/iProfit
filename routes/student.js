const express = require("express");
const {
  createStudent,
  login,
  getMe,
  getStudent,
  updateProfile,
  uploadPhoto,
  deleteStudent,
} = require("../controllers/student");
const Student = require("../models/Student");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(protect, authorize("SuperStudent", "Student"), createStudent)
  .get(
    protect,
    authorize("SuperStudent", "Student"),
    advancedResults(Student),
    getStudent
  );
router.route("/:id").delete(protect, authorize("SuperStudent"), deleteStudent);

router.route("/login").post(login);

router.route("/me").get(protect, getMe).put(protect, updateProfile);
router.route("/photo").post(protect, uploadPhoto);

module.exports = router;
