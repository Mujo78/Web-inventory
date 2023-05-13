const asyncHandler = require("express-async-handler")
const {verify} = require("jsonwebtoken")

exports.authMiddleware = asyncHandler(async(req, res, next) => {
    const token = req.header("accessToken")

    if(!token) return res.status(401).json()

    var payload = await verify(token.split("Bearer ")[1], process.env.SECRET)
    req.user = payload
    next()
})