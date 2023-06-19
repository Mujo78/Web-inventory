const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const Supplier = require("../models/supplier")
const Material = require("../models/material")
const Product_Process_Item = require("../models/product-process-item")


const addMaterial = asyncHandler( async(req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    const {
        name, supplier_id,
        quantity, min_quantity,
        price, unit_of_measure
    } = req.body

    const supplierWithMaterial = await Material.findOne({name: name, supplier_id: supplier_id})
    if(supplierWithMaterial){
        res.status(400)
        throw new Error("That material from this supplier is already in database!")
    }

    const supplier = await Supplier.findById(supplier_id)

    const newMaterial = await Material.create({
        name: name,
        supplier_id: supplier_id,
        quantity: quantity,
        min_quantity: min_quantity,
        price: Math.round(((price * (1 + (supplier.pdv / 100))) * 100) / 100),
        unit_of_measure: unit_of_measure,
        is_it_used: false
    })
    res.status(200).json(newMaterial)

})

const getMaterials = asyncHandler (async (req, res) => {

    const allMaterials = await Material.find()
    if(!allMaterials) return res.status(400).json("There are no materials available at this moment!")

    res.status(200).json(allMaterials)
})

const getMaterialById = asyncHandler (async (req, res) => {

    const material = await Material.findById(req.params.id)
    if(!material) return res.status(400).json("There was an error, please try again later!")
    
    res.status(200).json(material)
})

const editMaterial = asyncHandler( async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json(errors)
    }
    const {
        name,
        quantity,
        min_quantity,
        price,
        unit_of_measure,
        supplier_id
    } = req.body;

    const materialToUpdate = await Material.findById(req.params.id)
    
    if(name !== materialToUpdate.name && supplier_id !== materialToUpdate.supplier_id){
        const supplierWithMaterial = await Material.findOne({name: name, supplier_id: supplier_id})
        if(supplierWithMaterial){
            res.status(400)
            throw new Error("That material from this supplier is already in database!")
        }
    }

    const supplier = await Supplier.findById(supplier_id)
    
    const updates = {}
    if(name !== materialToUpdate.name) updates.name = name
    if(quantity !== materialToUpdate.quantity) updates.quantity = quantity
    if(min_quantity !== materialToUpdate.min_quantity) updates.min_quantity = min_quantity
    if(price !== materialToUpdate.price) {
        updates.price = Math.round(((price  * (1 + (supplier.pdv / 100))) * 100) / 100)
    }
    if(unit_of_measure !== materialToUpdate.unit_of_measure) updates.unit_of_measure = unit_of_measure
    if(supplier_id !== materialToUpdate.supplier_id) {
        const oldSupplier = await Supplier.findById(materialToUpdate.supplier_id)
        const priceWithoutPdv = Math.round(((materialToUpdate.price / (1 + (oldSupplier.pdv / 100))) * 100) / 100)
        const pr = price !== materialToUpdate.price ? price : priceWithoutPdv
        updates.price = Math.round(((pr  * (1 + (supplier.pdv / 100))) * 100) / 100),
        updates.supplier_id = supplier_id
    }

    
    const newOne = await Material.findByIdAndUpdate(req.params.id, updates, {new: true})
    if(newOne) return res.status(200).json(newOne)

    res.status(400).json("There was an error, please try again later!")
})

const deleteMaterial = asyncHandler (async (req, res) => {

    const material = await Material.findByIdAndDelete(req.params.id)
    if(!material) return res.status(400).json("There was an error, please try again later!")
    
    await Product_Process_Item.deleteMany({material_id: req.params.id})
    res.status(200).json(material._id)
})


module.exports = {
    addMaterial,
    getMaterials,
    editMaterial,
    deleteMaterial,
    getMaterialById
}
