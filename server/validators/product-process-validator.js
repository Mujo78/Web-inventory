const {check} = require("express-validator")
const{
    POST_NAME_PP,
    PP_ALREADY_EXISTS,
    POST_PRICE_PP,
    POST_PRICE_NUMERIC
} = require("../constants/product-process-constants")
const Product_Process = require("../models/product-process")

exports.createProductProcess = [
    check("name")
        .notEmpty()
        .withMessage(POST_NAME_PP)
        .custom(async (n) =>{
            const pp = await Product_Process.findOne({name: n})
            if(pp){
                return Promise.reject(PP_ALREADY_EXISTS) 
            }
        })
        .bail()
]

exports.editProductProcess = [
    check("name")
        .notEmpty()
        .withMessage(POST_NAME_PP)
        .custom(async (n) =>{
            const pp = await Product_Process.findOne({name: n})
            if(pp){
                return Promise.reject(PP_ALREADY_EXISTS) 
            }
        })
        .bail(),
    check("price")
        .notEmpty()
        .withMessage(POST_PRICE_PP)
        .isNumeric()
        .withMessage(POST_PRICE_NUMERIC)
        .bail()
]