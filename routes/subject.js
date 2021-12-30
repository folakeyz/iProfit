const express = require("express");
const {
  createSubject,
  getSubject,
  getSubjectById,
  updateSubject,
  deleteSubjectById,
  getSubjectByClass,
  getSubjectByCentre,
  unassignSubject,
} = require("../controllers/Subject");
const Subject = require("../models/Subject");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(protect, authorize("SuperAdmin", "Admin"), createSubject)
  .get(
    advancedResults(Subject, [
      {
        path: "centre",
        select: "name",
      },
      {
        path: "instructor",
        select: "firstname lastname",
      },
    ]),
    getSubject
  );
router.route("/centre").get(protect, getSubjectByCentre);
router.route("/unassign").put(protect, unassignSubject);
router
  .route("/:id")
  .delete(protect, authorize("SuperAdmin", "Admin"), deleteSubjectById)
  .get(getSubjectById)
  .put(protect, authorize("SuperAdmin", "Admin"), updateSubject);

router.route("/class/:id").get(getSubjectById);

module.exports = router;
