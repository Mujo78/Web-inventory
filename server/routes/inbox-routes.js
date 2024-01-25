const express = require("express");
const { authMiddleware } = require("../middleware/auth-middleware");
const {
  getMyInbox,
  getInboxMessages,
  deleteInboxWithPerson,
  getUserParticipantInfo,
} = require("../controllers/inbox-controller");
const router = express.Router();

router.get("/inbox", authMiddleware, getMyInbox);
router.get(
  "/inbox-participant/:inboxId",
  authMiddleware,
  getUserParticipantInfo
);
router.get("/inbox-messages/:inboxId", authMiddleware, getInboxMessages);
router.patch("/delete-inbox/:inboxId", authMiddleware, deleteInboxWithPerson);

module.exports = router;
