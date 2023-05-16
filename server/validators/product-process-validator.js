const {check} = require("express-validator")
const{
    POST_NAME_PP,
    PP_ALREADY_EXISTS,
    POST_PRICE_PP,
    POST_NAME_LENGTH,
    POST_PRICE_NUMERIC
} = require("../constants/product-process-constants")
const Product_Process = require("../models/product-process")

exports.createProductProcess = [
    check("name")
        .notEmpty()
        .withMessage(POST_NAME_PP)
        .isLength({min: 3})
        .withMessage(POST_NAME_LENGTH)
        .custom(async (n) =>{
            const pp = await Product_Process.findOne({name: n})
            if(pp){
                return Promise.reject(PP_ALREADY_EXISTS(n)) 
            }
        })
        .bail()
]

exports.editProductProcess = [
    check("name")
        .notEmpty()
        .withMessage(POST_NAME_PP)
        .isLength({min: 3})
        .withMessage(POST_NAME_LENGTH)
        .bail(),
    check("price")
        .notEmpty()
        .withMessage(POST_PRICE_PP)
        .isNumeric()
        .withMessage(POST_PRICE_NUMERIC)
        .bail()
]