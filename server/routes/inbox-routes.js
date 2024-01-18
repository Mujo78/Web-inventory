const express = require("express");
const { authMiddleware } = require("../middleware/auth-middleware");
const {
  getMyInbox,
  getInboxMessages,
} = require("../controllers/inbox-controller");
const router = express.Router();

router.get("/inbox", authMiddleware, getMyInbox);
router.post("/inbox-messages", authMiddleware, getInboxMessages);
module.exports = router;
