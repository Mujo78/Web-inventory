const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const Person = require("../models/person");
const { sendEmailContact } = require("../utils/email");

const contactUs = asyncHandler(async (req, res) => {
  const uploadedFile = req.file;
  const { subject, bodyText } = req.body;

  const user = await User.findById(req.user.id);
  const person = await Person.findById(user.person_id);

  const options = {
    name: person.first_name,
    lastName: person.last_name,
    email: person.email,
    subject,
    body: bodyText,
    file: uploadedFile,
  };

  await sendEmailContact(options);
});

module.exports = {
  contactUs,
};
