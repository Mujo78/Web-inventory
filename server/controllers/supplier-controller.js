const asyncHandler = require("express-async-handler")
const {v4: uuidv4} = require("uuid")
const { validationResult } = require("express-validator")
const Supplier = require("../models/supplier")
const Material = require("../models/material")

const addSupplier = asyncHandler( async(req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    const { 
        name,
        pdv,
        phone_number,
        contact_person,
        email
    } = req.body;

    const newOne = await Supplier.create({
        name: name,
        uid: uuidv4(),
        pdv: pdv,
        phone_number: phone_number,
        contact_person: contact_person,
        email: email,
        end_date: null
    })
    
    return res.status(200).json(`Successfully added new supplier: ${newOne.name}`)

})

const allSuppliers =  asyncHandler( async(req, res) => {
    
    const allSuppliers = await Supplier.find()
    if(allSuppliers) return res.status(200).json(allSuppliers)
    
    res.status(400).json("There are no suppliers available!")
})

const supplierById =  asyncHandler( async(req, res) => {
    
    const supplier = await Supplier.findOne({_id: req.params.id})
    if(supplier) return res.status(200).json(supplier)

    res.status(400).json("There are no suppliers available!")
})

const editSupplier = asyncHandler( async(req, res) => {
    
    const {
        name,
        pdv,
        phone_number,
        contact_person,
        email,
        end_date
    } = req.body;

    const updates = {}

    if(name) updates.name = name
    if(pdv) updates.pdv = pdv
    if(phone_number) updates.phone_number = phone_number
    if(contact_person) updates.contact_person = contact_person
    if(email) updates.email = email
    if(end_date) updates.end_date = end_date

    const supplier = await Supplier.findByIdAndUpdate({_id: req.params.id}, updates, {new: true})
    
    if(!supplier){
        res.status(400) 
        throw new Error("There was some error, try again later or report problem!")
    }

    return res.status(200).json(`${supplier.name} successfully updated!`)
})

const supplierMaterials = asyncHandler( async (req, res) =>{
    const supplier = await Supplier.findById(req.params.id)
    
    if(!supplier) {
        res.status(400)
        throw new Error("There was an error, please try again later!")
    }

    const supplierMaterials = await Material.find({supplier_id: supplier.id})
    if(supplierMaterials.length > 0) return res.status(200).json(supplierMaterials)

    res.status(400).json("There are no materials from this supplier!")
})

const suppliersMaterials = asyncHandler( async (req, res) =>{
    const suppliers = await Supplier.find()
    
    const suppWithMatt = []

    if(!suppliers) {
        res.status(400)
        throw new Error("There was no suppliers in database!")
    }

    for (const i of suppliers){

        const materials = await Material.countDocuments({supplier_id: i._id})

        const suppData = {
            supplier: i.toObject(),
            materials
        }

        suppWithMatt.push(suppData)
    }

    return res.status(200).json(suppWithMatt)
})

module.exports = {
    addSupplier,
    allSuppliers,
    supplierById,
    editSupplier,
    supplierMaterials,
    suppliersMaterials
}
