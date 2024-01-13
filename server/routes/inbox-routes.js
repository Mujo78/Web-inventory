const express = require("express");
const { authMiddleware } = require("../middleware/auth-middleware");
const { getMyInbox } = require("../controllers/inbox-controller");
const router = express.Router();

router.get("/inbox", authMiddleware, getMyInbox);

module.exports = router;
