const express = require("express");
const {
  createCentre,
  getCentre,
  getCentreById,
  update,
  deleteCentreById,
} = require("../controllers/Centre");
const Centre = require("../models/Centre");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(protect, authorize("SuperAdmin", "Admin"), createCentre)
  .get(advancedResults(Centre), getCentre);
router
  .route("/:id")
  .delete(protect, authorize("SuperAdmin", "Admin"), deleteCentreById)
  .get(getCentreById)
  .put(protect, authorize("SuperAdmin", "Admin"), update);

module.exports = router;
