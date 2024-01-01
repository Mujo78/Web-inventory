const { validationResult } = require("express-validator");

const formatErrors = (errors) => {
  const formattedErrors = {};
  errors.array().forEach((error) => {
    formattedErrors[error.path] = error.msg;
  });
  return formattedErrors;
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = formatErrors(errors);
    return res.status(400).json({ errors: formattedErrors });
  }
  next();
};

module.exports = validate;
