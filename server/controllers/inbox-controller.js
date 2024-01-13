const asyncHandler = require("express-async-handler");
const Inbox = require("../models/inbox");
const User = require("../models/user");

const getMyInbox = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const inbox = await Inbox.find({
    $or: [{ pOne: userId }, { pTwo: userId }],
  });

  let ids = inbox
    .map((m) => [m.pOne.toString(), m.pTwo.toString()])
    .flat()
    .filter((id) => id !== userId);

  const allUsersData = await User.find({ _id: { $in: ids } }).select(
    "_id username status"
  );

  if (inbox) return res.status(200).json(allUsersData);
});

module.exports = {
  getMyInbox,
};
