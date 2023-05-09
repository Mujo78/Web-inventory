const mongoose = require("mongoose")
const Supplier = require("./supplier")

const materialSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    min_quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unit_of_measure: {
        type: String,
        required: true,
        maxlength: 5
    },
    is_it_used: {
        type: Boolean,
        required: true
    },
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Material", materialSchema);