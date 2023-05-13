const {check} = require("express-validator")
const{
    POST_MINQUANTITY_MATERIAL,
    POST_MINQUANTITY_NUMERIC,
    POST_NAME_MATERIAL,
    POST_PRICE_MATERIAL,
    POST_PRICE_NUMERIC,
    POST_QUANTITY_MATERIAL,
    POST_QUANTITY_NUMERIC,
    POST_SUPPLIER_MATERIAL,
    POST_UNIT_LENGTH,
    POST_UNIT_MATERIAL,
    POST_USED_MATERIAL
} = require("../constants/material-constants")

exports.addNewMaterial = [
    check("name")
        .notEmpty()
        .withMessage(POST_NAME_MATERIAL)
        .bail(),
    check("quantity")
        .notEmpty()
        .withMessage(POST_QUANTITY_MATERIAL)
        .isNumeric()
        .withMessage(POST_QUANTITY_NUMERIC)
        .bail(),
    check("min_quantity")
        .notEmpty()
        .withMessage(POST_MINQUANTITY_MATERIAL)
        .isNumeric()
        .withMessage(POST_MINQUANTITY_NUMERIC)
        .bail(),
    check("price")
        .notEmpty()
        .withMessage(POST_PRICE_MATERIAL)
        .isNumeric()
        .withMessage(POST_PRICE_NUMERIC)
        .bail(),
    check("unit_of_measure")
        .notEmpty()
        .withMessage(POST_UNIT_MATERIAL)
        .isLength({max: 5})
        .withMessage(POST_UNIT_LENGTH)
        .bail(),
    check("is_it_used")
        .notEmpty()
        .withMessage(POST_USED_MATERIAL)
        .isBoolean()
        .withMessage("Is it used must be boolean!")
        .bail(),
    check("supplier_id")
        .notEmpty()
        .withMessage(POST_SUPPLIER_MATERIAL)
        .bail()
]