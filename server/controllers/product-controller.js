const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator");
const Product = require("../models/product");

const addProduct = asyncHandler( async(req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json(errors)
    }

    const newOne = await Product.create(req.body)

    return res.status(200).json(newOne)
})

module.exports = {
    addProduct
}
