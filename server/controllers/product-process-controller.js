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
    } = req.body

    const newProductProcess = await Product_Process.create({
        name: name,
        price:0,
        end_date: null
    })

    res.status(200).json(newProductProcess)
})

const editProcess = asyncHandler( async (req, res) => {

    const {name, price, end_date} = req.body;

    const updates = {}
    if(name) updates.name = name
    if(price) updates.price = price
    if(end_date !== "" || null) updates.end_date = end_date

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


module.exports = {
    addProductProcess,
    getProcessById,
    getProcesses,
    editProcess
}