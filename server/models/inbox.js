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
    },
    isDeletedByPTwo: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inbox", inboxSchema);
