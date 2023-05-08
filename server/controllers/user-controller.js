const asyncHandler = require("express-async-handler")
const { sign } = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const { validationResult } = require("express-validator")

const login = asyncHandler(async (req, res) =>{

    const errors = validationResult(req)


    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }else{

        const {
            username,
            password
        } = req.body
    
        const user = await User.findOne({username: username})
        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password)
    
            if(isPasswordValid){
                const token = sign({
                    id: user._id,
                    username: user.username
                }, process.env.SECRET)
                
                return res.status(200).json({
                    accessToken: token,
                    username: username,
                    id: user._id
                })
            }else{
                res.status(400).json("Username or password is incorrect!")
            }
        }else{
            res.status(400).json("Username or password is incorrect!")
        }
    }

})


module.exports = {
    login
}