const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const Product_Process = require("../models/product-process")
const Product_Process_Item = require("../models/product-process-item");


const addProductProcess = asyncHandler( async(req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json(errors)
    }

    const processes = await Product_Process.find();

    const {
        name,
    } = req.body

    const newProductProcess = await Product_Process.create({
        name: name,
        price:0,
        start_date: processes ? null : Date.now(),
        end_date: null
    })

    return res.status(200).json(newProductProcess)
})

const editProcess = asyncHandler( async (req, res) => {

    const {name, price} = req.body;

    const updates = {}
    if(name) updates.name = name
    if(price) updates.price = price

    const process = await Product_Process.findByIdAndUpdate(req.params.id, updates, {new: true})
    
    if(process) return res.status(200).json(process)

    return res.status(400).json("There was an error, please try again later!")
})

const getProcesses = asyncHandler( async(req, res) =>{

    const processes = await Product_Process.find()
    if(processes) return res.status(200).json(processes)
    res.status(400).json("There are no product processes available!")

})

const getProcessById = asyncHandler( async(req, res) =>{

    const process = await Product_Process.findById(req.params.id)
    if(process) {
        const processItems = await Product_Process_Item.find({product_process_id: process._id}).populate("material_id")
        const processById = {
            processData: process,
            processItems: processItems
        }
        return res.status(200).json(processById)
    }
    return res.status(400).json("There was an error, please try again later!")
})

const makeProcessActive = asyncHandler( async (req, res) => {

    await Product_Process.findOneAndUpdate({start_date: {$not: {$eq : null || ""} }, end_date: {$eq : null}}, {start_date: null}, {new: true})
    const updated = await Product_Process.findByIdAndUpdate(req.params.id, {end_date: null, start_date: Date.now()}, {new:true})

    return res.status(200).json(updated)
})

const deactivateProcess = asyncHandler( async (req, res) => {

    const updated = await Product_Process.findOneAndUpdate({_id: req.params.id }, {start_date:  Date.now(), end_date: Date.now()}, {new: true})
    if(!updated) return res.status(404).json("Something went wrong, please try again later!")
    return res.status(200).json(updated)
})

const makeProcessUsable = asyncHandler( async (req, res) =>{

    const updated = await Product_Process.findByIdAndUpdate(req.params.id,{start_date:  null, end_date: null}, {new: true})
    if(!updated) return res.status(404).json("Something went wrong, please try again later!")
    return res.status(200).json(updated)
})

module.exports = {
    addProductProcess,
    getProcessById,
    getProcesses,
    editProcess,
    makeProcessActive,
    deactivateProcess,
    makeProcessUsable
}