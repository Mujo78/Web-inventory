const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const Supplier = require("../models/supplier")
const Material = require("../models/material")

const addMaterial = asyncHandler( async(req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    // is_it_used - depending on using in ppi

    const {
        name, supplier_id
    } = req.body

    const supplier = await Material.findOne({name: name, supplier_id: supplier_id})
    if(supplier){
        res.status(400)
        throw new Error("That material from this supplier is already in database!")
    }

    const newMaterial = await Material.create(req.body)
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
    
    const {
        name,
        quantity,
        min_quantity,
        price,
        unit_of_measure,
        is_it_used,
        supplier_id
    } = req.body;

    const updates = {}
    if(name) updates.name = name
    if(quantity) updates.quantity = quantity
    if(min_quantity) updates.min_quantity = min_quantity
    if(price) updates.price = price
    if(unit_of_measure) updates.unit_of_measure = unit_of_measure
    if(is_it_used) updates.is_it_used = is_it_used
    if(supplier_id) updates.supplier_id = supplier_id

    const material = await Material.findByIdAndUpdate({_id: req.params.id}, updates, {new: true})
    if(!material){
        res.status(400)
        throw new Error ("There was some error, please try again later!")
    }

    res.status(200).json(material)
})

module.exports = {
    addMaterial,
    getMaterials,
    editMaterial,
    getMaterialById
}
