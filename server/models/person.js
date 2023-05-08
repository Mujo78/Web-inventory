const mongoose = require("mongoose")

const personSchema = mongoose.Schema({
    first_name: {
        type: String,
        maxlength: 50
    },
    last_name: {
        type: String,
        maxlength: 50
    },
    phone_number:{
        type: String, 
        unique: true,
        maxlength: 12
    },
    address: {
        type: String,
        maxlength: 100
    },
    email: {
        type: String,
        unique: true
    },
    cancellation_date:{
        type: Date,
        required: false
    }
}, {
    timestamps: {
        createdAt: 'date_of_employment',
        updatedAt: true
    }
})


module.exports = mongoose.model('Person', personSchema);
