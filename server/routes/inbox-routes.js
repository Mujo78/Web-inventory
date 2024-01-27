const express = require("express");
const { authMiddleware } = require("../middleware/auth-middleware");
const {
  getMyInbox,
  getInboxMessages,
  deleteInboxWithPerson,
  getInboxById,
} = require("../controllers/inbox-controller");
const router = express.Router();

router.get("/inbox", authMiddleware, getMyInbox);
router.get("/inbox/:inboxId", authMiddleware, getInboxById);
router.get("/inbox-messages/:inboxId", authMiddleware, getInboxMessages);
router.patch("/delete-inbox/:inboxId", authMiddleware, deleteInboxWithPerson);

module.exports = router;
