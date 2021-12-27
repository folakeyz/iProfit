const express = require("express");
const {
  createAdmin,
  login,
  getMe,
  getAdmin,
  updateProfile,
  uploadPhoto,
  deleteAdmin,
} = require("../controllers/admin");
const Admin = require("../models/Admin");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize("SuperAdmin", "Admin"), createAdmin)
  .get(
    protect,
    authorize("SuperAdmin", "Admin"),
    advancedResults(Admin),
    getAdmin
  );
router.route("/:id").delete(protect, authorize("SuperAdmin"), deleteAdmin);

router.route("/login").post(login);

router.route("/me").get(protect, getMe).put(protect, updateProfile);
router.route("/photo").post(protect, uploadPhoto);

module.exports = router;
