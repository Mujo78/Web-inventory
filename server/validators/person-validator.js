const { check } = require("express-validator");
const {
  POST_PHONE_LETTER,
  POST_ADDRESS_LENGTH,
  POST_ADDRESS_PERSON,
  POST_FIRSTNAME_PERSON,
  POST_FIRSTNAME_PERSON_MAX,
  POST_LASTNAME_PERSON,
  POST_LASTNAME_PERSON_MAX,
  POST_PHONE_LENGTH,
  POST_PHONE_PERSON,
} = require("../constants/person-constants");

exports.createPersonValidator = [
  check("first_name")
    .notEmpty()
    .withMessage(POST_FIRSTNAME_PERSON)
    .isLength({ max: 50 })
    .withMessage(POST_FIRSTNAME_PERSON_MAX)
    .bail(),
  check("last_name")
    .notEmpty()
    .withMessage(POST_LASTNAME_PERSON)
    .isLength({ max: 50 })
    .withMessage(POST_LASTNAME_PERSON_MAX)
    .bail(),
  check("phone_number")
    .notEmpty()
    .withMessage(POST_PHONE_PERSON)
    .isLength({ max: 12 })
    .withMessage(POST_PHONE_LENGTH)
    .custom((value) => {
      if (value === "") {
        return true;
      }
      return /^\d+$/.test(value);
    })
    .withMessage(POST_PHONE_LETTER)
    .bail(),
  check("address")
    .notEmpty()
    .withMessage(POST_ADDRESS_PERSON)
    .isLength({ max: 100 })
    .withMessage(POST_ADDRESS_LENGTH)
    .bail(),
];
