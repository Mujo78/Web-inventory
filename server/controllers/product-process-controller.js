const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const Product_Process = require("../models/product-process")


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

    res.status(200).json(newProductProcess)
})

const editProcess = asyncHandler( async (req, res) => {

    const {name, price,start_date, end_date} = req.body;

    const oldProcess = await Product_Process.findOne({name: name})

    if(oldProcess?.id.toString() !== req.params.id.toString()){
        res.status(400)
        throw new Error("Name is already in use!")
    }

    const updates = {}
    if(name) updates.name = name
    if(price) updates.price = price
    if(end_date !== "" || null) updates.end_date = end_date
    if(start_date !== "" || null) updates.start_date = start_date


    const process = await Product_Process.findByIdAndUpdate(req.params.id, updates, {new: true})
    
    if(process) return res.status(200).json(process)

    res.status(400).json("There was an error, please try again later!")


})

const getProcesses = asyncHandler( async(req, res) =>{

    const processes = await Product_Process.find()
    if(processes) return res.status(200).json(processes)
    res.status(400).json("There are no product processes available!")

})

const getProcessById = asyncHandler( async(req, res) =>{

    const process = await Product_Process.findById(req.params.id)
    if(process) return res.status(200).json(process)
    res.status(400).json("There was an error, please try again later!")
})

const makeProcessActive = asyncHandler( async (req, res) => {

    await Product_Process.findOneAndUpdate({start_date: {$not: {$eq : null || ""} }}, {start_date: null}, {new: true})
    await Product_Process.findByIdAndUpdate(req.params.id, {start_date: Date.now()}, {new:true})

    res.status(200).json("Process is activated")
})

module.exports = {
    addProductProcess,
    getProcessById,
    getProcesses,
    editProcess,
    makeProcessActive
}