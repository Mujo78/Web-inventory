const asyncHandler = require("express-async-handler");
const Inbox = require("../models/inbox");
const User = require("../models/user");
const Message = require("../models/message");

const getMyInbox = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const inbox = await Inbox.find({
    $and: [{ deletedBy: { $ne: userId } }, { participants: { $in: [userId] } }],
  })
    .populate({ path: "participants", select: "_id username status" })
    .lean();

  const data = inbox.map((m) => {
    const onePart = m.participants.find((el) => el._id.toString() !== userId);
    return {
      ...m,
      participants: undefined,
      participant: onePart,
    };
  });

  if (inbox) return res.status(200).json(data);
});

const getInboxMessages = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const receiverId = req.params.userId;

  const inbox = await Inbox.findOne({
    $or: [
      { participants: [userId, receiverId] },
      { participants: [receiverId, userId] },
    ],
  });

  if (inbox && inbox.deletedBy !== userId) {
    const messages = await Message.find({ inboxId: inbox._id })
      .select("-updatedAt")
      .sort({
        createdAt: 1,
      });

    return res.status(200).json(messages);
  }

  return res.status(400).json("There was an error please try again later!");
});

const deleteInboxWithPerson = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const receiverId = req.params.userId;

  const inbox = await Inbox.findOne({
    $or: [
      { participants: [userId, receiverId] },
      { participants: [receiverId, userId] },
    ],
  });

  if (inbox) {
    if (!inbox.deletedBy) {
      inbox.deletedBy = userId;
      await inbox.save();
    } else {
      await Message.deleteMany({ inboxId: inbox._id });
      await Inbox.findByIdAndDelete(inbox._id);
    }

    return res.status(200).json("Successfully deleted!");
  }

  return res.status(400).json("There was an error, please try again latter!");
});

module.exports = {
  getMyInbox,
  getInboxMessages,
  deleteInboxWithPerson,
};
