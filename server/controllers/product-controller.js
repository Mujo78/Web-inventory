const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const Product_Process = require("../models/product-process");

const addProduct = asyncHandler( async(req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json(errors)
    }
    const {
        name,
        product_process_id,
        photo_url,
        mark_up,
    } = req.body;

    const ProductByProcess = await Product.findOne({product_process_id: product_process_id})
    if(ProductByProcess) {
        res.status(400)
        throw new Error("Product process already in use!")
    }
    const process = await Product_Process.findById(product_process_id);

    const mark_up_modify = 1 + (mark_up / 100);

    const newOne = await Product.create({
        name: name,
        product_process_id: product_process_id,
        photo_url: photo_url,
        mark_up: mark_up,
        price: process.price * mark_up_modify
    })

    return res.status(200).json(newOne)
})

module.exports = {
    addProduct
}
