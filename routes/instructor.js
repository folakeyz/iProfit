const express = require("express");
const {
  createInstructor,
  getInstructor,
  getMe,
  updateProfile,
  uploadPhoto,
  deleteAdmin,
  login,
} = require("../controllers/instructor");
const Instructor = require("../models/Instructor");
const { teacher, protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, createInstructor)
  .get(protect, advancedResults(Instructor), getInstructor);
router.route("/:id").delete(protect, deleteAdmin);

router.route("/login").post(login);

router.route("/me").get(teacher, getMe).put(teacher, updateProfile);
router.route("/photo").post(teacher, uploadPhoto);

module.exports = router;
