const express = require("express");
const { AdminLogs } = require("../controllers/log");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").get(protect, AdminLogs);

module.exports = router;
