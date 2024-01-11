const { default: mongoose, Types } = require("mongoose");

const messageScheme = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    inboxId: {
      type: Types.ObjectId,
      ref: "Inbox",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

messageScheme.index({ inboxId: 1 });

module.exports = mongoose.model("Message", messageScheme);
