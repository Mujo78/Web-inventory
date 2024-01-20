const asyncHandler = require("express-async-handler");
const Inbox = require("../models/inbox");
const User = require("../models/user");
const Message = require("../models/message");

const getMyInbox = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const inbox = await Inbox.find({
    participants: { $in: [userId] },
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

  if (inbox) {
    const messages = await Message.find({ inboxId: inbox._id })
      .select("-inboxId -updatedAt")
      .sort({
        createdAt: 1,
      });

    return res.status(200).json(messages);
  }

  return res.status(400).json("There was an error please try again later!");
});

module.exports = {
  getMyInbox,
  getInboxMessages,
};
