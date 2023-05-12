const mongoose = require("mongoose")

const productProcessSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    end_date:{
        type: Date,
        required: false
    },
    price: {
        type: Number,
        required: false
    }
}, {
    timestamps: {
        createdAt: 'start_date'
    }
})

module.exports = mongoose.model("Product_Process", productProcessSchema);