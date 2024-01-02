/** @type {mongodb.Db} */
const asyncHandler = require("express-async-handler");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Person = require("../models/person");
const { validationResult } = require("express-validator");

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username: username })
    .populate("person_id")
    .populate("role_id");

  if (user?.person_id?.cancellation_date === null) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = sign(
        {
          id: user._id,
          username: user.username,
          role: user.role_id.name,
        },
        process.env.SECRET
      );

      return res.status(200).json({
        accessToken: token,
        username: username,
        id: user._id,
        role: user.role_id.name,
      });
    }
    res.status(400);
    throw new Error("Username or password is incorrect!");
  }
  res.status(400);
  throw new Error("Username or password is incorrect!");
});
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findOne({ username: req.user.username });

  if (!user) {
    res.status(400);
    throw new Error("Not authorized!");
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  const oldAndNew = await bcrypt.compare(newPassword, user.password);

  if (isPasswordValid) {
    if (!oldAndNew) {
      if (newPassword === confirmPassword) {
        let hash = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(
          user.id,
          { $set: { password: hash } },
          { new: true }
        );

        return res.status(200).json("Password successfully changed!");
      }
      res.status(400);
      throw new Error("New password and confirm password are not equal!");
    }
    res.status(400);
    throw new Error("Old password and new password can't be equal!");
  }
  res.status(400);
  throw new Error("Wrong password!");
});

const resignation = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  await Person.findOneAndUpdate(
    { id: user.person_id },
    { cancellation_date: Date.now() },
    { new: true }
  );

  return res.status(200).json();
});

module.exports = {
  login,
  changePassword,
  resignation,
};
