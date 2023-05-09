const mongoose = require('mongoose')

const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    pdv: {
        type: Number,
        required: true
    },
    phone_number:{
        type: String, 
        unique: true,
        maxlength: 12
    },
    contact_person:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    end_date:{
        type: Date,
        required: false,
        default: null
    }
}, {
    timestamps:{
        createdAt: 'start_date',
        updatedAt: true
    }
})

module.exports = mongoose.model('Supplier', supplierSchema);
