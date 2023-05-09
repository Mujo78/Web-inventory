const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const Supplier = require("../models/supplier")
const Material = require("../models/material")

const addMaterial = asyncHandler( async(req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

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

module.exports = {
    addMaterial
}
