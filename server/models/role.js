const mongoose = require("mongoose")

const roleSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name for role is required!"]
    }
}, {
    timestamps: false
})


module.exports = mongoose.model('Role', roleSchema);