const asyncHandler = require("express-async-handler")
const {verify} = require("jsonwebtoken")

exports.adminCheck = asyncHandler(async(req, res, next) => {
    const token = req.header("accessToken")

    if(!token) return res.status(401).json()

    var payload = await verify(token.split("Bearer ")[1], process.env.SECRET)
    req.user = payload
    
    if(req.user.role === 'Admin'){
        next()
    }

    res.status(401).json("You are not authorized!")
})