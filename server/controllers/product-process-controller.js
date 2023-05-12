const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const Product_Process = require("../models/product-process")


const addProductProcess = asyncHandler( async(req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json(errors)
    }

    const {
        name,
        price
    } = req.body

    const newProductProcess = await Product_Process.create({
        name: name,
        price:price,
        end_date: null
    })

    res.status(200).json(newProductProcess)
})


module.exports = {
    addProductProcess
}