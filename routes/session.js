const express = require("express");
const {
  createSession,
  getSession,
  getSessionById,
  updateSession,
  deleteSessionById,
} = require("../controllers/session");
const Session = require("../models/Session");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize("SuperAdmin", "Admin"), createSession)
  .get(advancedResults(Session), getSession);
router
  .route("/:id")
  .delete(protect, authorize("SuperAdmin", "Admin"), deleteSessionById)
  .get(getSessionById)
  .put(protect, authorize("SuperAdmin", "Admin"), updateSession);

module.exports = router;
