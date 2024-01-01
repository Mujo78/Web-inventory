const express = require("express");
const validate = require("../middleware/validate");
const { authMiddleware } = require("../middleware/auth-middleware");
const { contactUs } = require("../controllers/contact-controller");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/contact-us", authMiddleware, upload.single("file"), contactUs);

module.exports = router;
