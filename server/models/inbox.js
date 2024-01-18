const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    deletedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    lastMessage: {
      senderId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      content: String,
      isRead: Boolean,
      createdAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inbox", inboxSchema);
