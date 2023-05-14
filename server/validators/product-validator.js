const {check} = require("express-validator")
const {
    POST_MARKUP_NUMERIC,
    POST_NAME_MAXLENGTH,
    POST_NAME_MINLENGTH,
    POST_PRICE_NUMERIC,
    POST_PRODUCT_MARKUP,
    POST_PRODUCT_PRICE,
    POST_PRODUCT_NAME,
    POST_PRODUCT_PHOTO,
    POST_PRODUCT_PROCESS
} = require("../constants/product-constants")

exports.addNewProduct = [
    check("name")
        .notEmpty()
        .withMessage(POST_PRODUCT_NAME)
        .isLength({min: 2})
        .withMessage(POST_NAME_MINLENGTH)
        .isLength({max: 100})
        .withMessage(POST_NAME_MAXLENGTH)
        .bail(),
    check("photo_url")
        .notEmpty()
        .withMessage(POST_PRODUCT_PHOTO)
        .bail(),
    check("product_process_id")
        .notEmpty()
        .withMessage(POST_PRODUCT_PROCESS)
        .bail(),
    check("mark_up")
        .notEmpty()
        .withMessage(POST_PRODUCT_MARKUP)
        .isNumeric()
        .withMessage(POST_MARKUP_NUMERIC)
        .bail()
]