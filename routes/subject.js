const express = require("express");
const {
  createSubject,
  getSubject,
  getSubjectById,
  updateSubject,
  deleteSubjectById,
  getSubjectByClass,
} = require("../controllers/Subject");
const Subject = require("../models/Subject");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize("SuperAdmin", "Admin"), createSubject)
  .get(advancedResults(Subject), getSubject);
router
  .route("/:id")
  .delete(protect, authorize("SuperAdmin", "Admin"), deleteSubjectById)
  .get(getSubjectById)
  .put(protect, authorize("SuperAdmin", "Admin"), updateSubject);
router.route("/class/:id").get(getSubjectById);

module.exports = router;
