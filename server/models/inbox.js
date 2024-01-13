const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema(
  {
    pOne: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pTwo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeletedByPOne: {
      type: Boolean,
      default: false,
    },
    isDeletedByPTwo: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inbox", inboxSchema);
