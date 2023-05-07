const mongoose = require("mongoose");
const Person = require("./person");
const Role = require("./role")

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    person_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema);
