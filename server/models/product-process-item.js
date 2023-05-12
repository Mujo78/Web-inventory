const mongoose = require("mongoose")
const Product_Process = require("./product-process")
const Material = require("./material")

const productProcessItemSchema = mongoose.Schema({
    material_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true
    },
    product_process_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product_Process",
        required: true
    },
    quantity:{
        type: Number, 
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product_Process_Item", productProcessItemSchema);