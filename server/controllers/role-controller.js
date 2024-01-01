const asyncHandler = require("express-async-handler");
const Role = require("../models/role");

const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find();

  res.status(200).json(roles);
});

const addRole = asyncHandler(async (req, res) => {
  const role = await Role.create({
    name: req.body.name,
  });

  res.status(200).json(role);
});

module.exports = {
  getRoles,
  addRole,
};
