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
const { teacher } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(teacher, createInstructor)
  .get(teacher, advancedResults(Instructor), getInstructor);
router.route("/:id").delete(teacher, deleteAdmin);

router.route("/login").post(login);

router.route("/me").get(teacher, getMe).put(teacher, updateProfile);
router.route("/photo").post(teacher, uploadPhoto);

module.exports = router;
