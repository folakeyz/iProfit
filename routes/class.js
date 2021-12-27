const express = require("express");
const {
  createClass,
  getClass,
  getClassById,
  update,
  deleteClassById,
} = require("../controllers/class");
const Class = require("../models/Class");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize("SuperAdmin", "Admin"), createClass)
  .get(advancedResults(Class), getClass);
router
  .route("/:id")
  .delete(protect, authorize("SuperAdmin", "Admin"), deleteClassById)
  .get(getClassById)
  .put(protect, authorize("SuperAdmin", "Admin"), update);

module.exports = router;
