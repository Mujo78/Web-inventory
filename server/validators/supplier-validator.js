const {check} = require("express-validator")
const {
    POST_CONTACT_PERSON,
    POST_EMAIL_SUPPLIER,
    POST_PDV_SUPPLIER,
    POST_PHONENUMBER_LENGTH,
    POST_PHONENUMBER_SUPPLIER,
    POST_PHONE_LETTER,
    POST_SUPPLIER_NAME,
    POST_UID_SUPPLIER,
    POST_PDVNUMERIC_SUPPLIER,
    POST_UIDNUMERIC_SUPPLIER,
    POST_EMAIL_CORRECT
} = require("../constants/supplier-constants")

exports.addNewSupplier = [
    check("name")
        .notEmpty()
        .withMessage(POST_SUPPLIER_NAME)
        .bail(),
    check("uid")
        .notEmpty()
        .withMessage(POST_UID_SUPPLIER)
        .isNumeric()
        .withMessage(POST_UIDNUMERIC_SUPPLIER)
        .bail(),
    check("pdv")
        .notEmpty()
        .withMessage(POST_PDV_SUPPLIER)
        .isNumeric()
        .withMessage(POST_PDVNUMERIC_SUPPLIER)
        .bail(),
    check("phone_number")
        .notEmpty()
        .withMessage(POST_PHONENUMBER_SUPPLIER)
        .isLength({max: 12})
        .withMessage(POST_PHONENUMBER_LENGTH)
        .custom((value) => {
            if (value === "") {
                return true;
            }
            return /^\d+$/.test(value);
        })
        .withMessage(POST_PHONE_LETTER)
        .bail(),
    check("contact_person")
        .notEmpty()
        .withMessage(POST_CONTACT_PERSON)
        .bail(),
    check("email")
        .notEmpty()
        .withMessage(POST_EMAIL_SUPPLIER)
        .isEmail()
        .withMessage(POST_EMAIL_CORRECT)
        .bail()
]