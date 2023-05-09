const mongoose = require("mongoose");
const Person = require("./person");
const Role = require("./role")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        maxlength: 100
    },
    password: {
        type: String,
        minlength: 5
    },
    person_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
        unique: true
    },
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema);
