const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const Product_Process = require("../models/product-process");

const addProduct = asyncHandler( async(req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    const {
        name,
        product_process_id,
        photo_url,
        mark_up,
    } = req.body;

    if(await Product.findOne({name: name})) return res.status(400).json("Product with that name already exist!")

    const process = await Product_Process.findById(product_process_id);

    const mark_up_modify = 1 + (mark_up / 100);
    const price = (process.price * mark_up_modify).toFixed(2)

    const newOne = await Product.create({
        name: name,
        product_process_id: product_process_id,
        photo_url: photo_url,
        mark_up: mark_up,
        price
    })

    return res.status(200).json(newOne)
})

const getProducts = asyncHandler( async (req, res) => {

    const products = await Product.find();
    if(products) return res.status(200).json(products)

    return res.status(400).json("There are no products available!")
})

const getProductById = asyncHandler( async (req, res) => {

    const product = await Product.findById(req.params.id);
    if(product) return res.status(200).json(product)

    return res.status(400).json("There was an error, please try again later!")
})

const editProduct = asyncHandler( async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json(errors)
    }
    const {
        name,
        product_process_id,
        photo_url,
        mark_up,
    } = req.body;
    
    const productToEdit = await Product.findById(req.params.id)
    const process = await Product_Process.findById(product_process_id);

    const updates = {}
    if(name !== productToEdit.name) updates.name = name
    if(product_process_id !== productToEdit.product_process_id.toString()) {
        updates.product_process_id = product_process_id
        updates.price = Math.round((process.price * (1 + (mark_up / 100))) * 100) / 100
    }
    if(photo_url !== productToEdit.photo_url) updates.photo_url = photo_url
    if(mark_up !== productToEdit.mark_up) {
        updates.mark_up = mark_up
        updates.price = Math.round((productToEdit.price * (1 + (mark_up / 100))) * 100) / 100
    }

    const newOne =  await Product.findByIdAndUpdate(req.params.id, updates, {new: true})
    if(newOne) return res.status(200).json(`Product: ${newOne.name} successfully updateed!`)

    return res.status(400).json("There was an error, please try again later!")
})


module.exports = {
    getProducts,
    getProductById,
    editProduct,
    addProduct
}
