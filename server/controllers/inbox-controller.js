const asyncHandler = require("express-async-handler");
const Inbox = require("../models/inbox");
const User = require("../models/user");

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

module.exports = {
  getMyInbox,
};
