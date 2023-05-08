const asyncHandler = require("express-async-handler")
const Person = require("../models/person")
const User = require("../models/user")

const bcrypt = require("bcrypt")
const Role = require("../models/role")
const { validationResult } = require("express-validator")


const registration = asyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json(errors)
    }
        const {
            first_name,
            last_name,
            phone_number,
            address
        } = req.body
    
        let username = first_name.toLowerCase() + "." + last_name.toLowerCase();
    
        const user = await User.findOne({username: username})
        
        if(user){
            res.status(400)
            throw new Error("User already exists!")
        }
        
        const newPerson = await Person.create({
            firstName: first_name,
            lastName: last_name,
            phone_number: phone_number,
            address: address,
            email: first_name.toLowerCase() + "." + last_name.toLowerCase() + "@company.com",
            cancellation_date: ""
        })
        
        let password = first_name.charAt(0).toUpperCase() + first_name.slice(1) + "." + last_name.charAt(0).toUpperCase() + last_name.slice(1);
        
        const hash = await bcrypt.hash(password, 10)
    
        const UserRoleId = await Role.findOne({name: "User"})
    
        if(!UserRoleId){
            res.status(400)
            throw new Error("Role for this user is not found!")
        }
    
        const newUser = await User.create({
            username: username,
            password: hash,
            person_id: newPerson._id,
            role_id: UserRoleId._id
        })
    
        return res.status(200).json(newUser)
})

module.exports = {
    registration
}