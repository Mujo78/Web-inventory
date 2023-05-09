const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const Supplier = require("../models/supplier")

const addSupplier = asyncHandler( async(req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json(errors)
    }

    const { name } = req.body;
    const supplier = await Supplier.findOne({name: name})

    if(supplier){
        res.status(400)
        throw new Error("Supplier is already in database!")
    }

    const newOne = await Supplier.create(req.body)
    res.status(200).json(`Successfully added new supplier: ${newOne.name}`)
})

module.exports = {
    addSupplier
}
