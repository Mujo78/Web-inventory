const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const Product_Process_Item = require("../models/product-process-item");
const Material = require("../models/material");
const Product_Process = require("../models/product-process");


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

    const oldOne = await Product_Process_Item.findOne({product_process_id : product_process_id, material_id: material_id})
    if(oldOne){
        res.status(400)
        throw new Error("You already added this item!")
    }

    const material = await Material.findById(material_id)
    let qnty = material.quantity;

    if(material.quantity < quantity) {
        res.status(400)
        throw new Error(`In our stock there is only: ${material.quantity} ${material.name}!`)
    }

    material.quantity = material.quantity - quantity;
    if(material.quantity < material.min_quantity) material.quantity += qnty;

    await Product_Process.findOneAndUpdate({_id: product_process_id}, {$inc: {price: material.price * quantity}}, {new: true})
    await material.updateOne({$set: {quantity: material.quantity}}, {new: true})

    const newItem = await Product_Process_Item.create({
        material_id: material_id,
        product_process_id: product_process_id,
        quantity: quantity
    })

    return res.status(200).json(newItem)
})

const editItem = asyncHandler( async(req, res) =>{

    const {
        material_id,
        product_process_id,
        quantity
    } = req.body

    const updates = {}
    if(material_id) updates.material_id = material_id
    if(product_process_id) updates.product_process_id = product_process_id
    if(quantity) updates.quantity = quantity

    const item = await Product_Process_Item.findByIdAndUpdate(req.params.id, updates, {new: true})
    
    if(item) return res.status(200).json(item)

    res.status(400).json("There was an error, please try again later!")
})

const getItems = asyncHandler( async (req, res) =>{

    const items = await Product_Process_Item.find().populate("material_id")
    if(items) return res.status(200).json(items)


    res.status(400).json("There is no items available!")
})

const getItemsForProcess = asyncHandler( async (req, res) =>{

    const items = await Product_Process_Item.find({product_process_id: req.params.id}).populate("material_id")
    if(items) return res.status(200).json(items)

    res.status(400).json("There is no items for this process!")
})

module.exports = {
    addProcessItem,
    getItems,
    getItemsForProcess,
    editItem
}