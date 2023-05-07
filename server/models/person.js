const mongoose = require("mongoose")

const personSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone_number:{
        type: String, 
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date_of_employment:{
        type: Date,
        required: true
    },
    cancellation_date:{
        type: Date,
        required: false
    }
}, {
    timestamps: true,
    createdAt: 'date_of_employment',
    updatedAt: false
})


module.exports = mongoose.model('Person', personSchema);
