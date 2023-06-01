const {check} = require("express-validator")
const {
    POST_CONTACT_PERSON,
    POST_EMAIL_SUPPLIER,
    POST_PDV_SUPPLIER,
    POST_PHONENUMBER_LENGTH,
    POST_PHONENUMBER_SUPPLIER,
    POST_PHONE_LETTER,
    POST_SUPPLIER_NAME,
    POST_PDVNUMERIC_SUPPLIER,
    POST_EMAIL_CORRECT,
    EMAIL_ALREADY_USED,
    PHONE_ALREADY_USED,
    SUPPLIER_DUPLICATE
} = require("../constants/supplier-constants");
const Supplier = require("../models/supplier");

exports.addNewSupplier = [
    check("name")
        .notEmpty()
        .withMessage(POST_SUPPLIER_NAME)
        .custom(async (n) =>{
            const supplier = await Supplier.findOne({name: n})
            if(supplier){
                return Promise.reject(SUPPLIER_DUPLICATE)
            }
        })
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
        .custom(async (n) =>{
            const supplierPhone = await Supplier.findOne({phone_number: n})
            if(supplierPhone){
                return Promise.reject(PHONE_ALREADY_USED)
            }
        })
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
        .custom(async (value) => {
            const supplierEmail = await Supplier.findOne({email: value})
            if(supplierEmail){
                return Promise.reject(EMAIL_ALREADY_USED)
            }
        })
        .bail()
]