const {check} = require("express-validator")
const{
   POST_MATERIAL_PPI,
   POST_PROCESS_PPI,
   POST_QUANTITY_NUMERIC,
   POST_QUANTITY_PPI
} = require("../constants/product-process-items-constants")


exports.createNewProcessItem = [
    check("material_id")
        .notEmpty()
        .withMessage(POST_MATERIAL_PPI)
        .bail(),
    check("product_process_id")
        .notEmpty()
        .withMessage(POST_PROCESS_PPI)
        .bail(),
    check("quantity")
        .notEmpty()
        .withMessage(POST_QUANTITY_PPI)
        .isNumeric()
        .withMessage(POST_QUANTITY_NUMERIC)
        .bail()
]