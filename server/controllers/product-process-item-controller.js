const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const Product_Process_Item = require("../models/product-process-item")

const addProcessItem = asyncHandler( async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json(errors)
    }

    const {
        material_id,
        product_process_id,
        quantity
    } = req.body;

    const oldOne = await Product_Process_Item.findOne({material_id: material_id})
    if(oldOne){
        res.status(400)
        throw new Error("You already added this item!")
    }

    const newItem = await Product_Process_Item.create({
        material_id: material_id,
        product_process_id: product_process_id,
        quantity: quantity
    })

    return res.status(200).json(newItem)
})

module.exports = {
    addProcessItem
}