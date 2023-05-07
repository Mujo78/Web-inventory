const asyncHandler = require("express-async-handler")
const Person = require("../models/person")

const bcrypt = require("bcrypt")


const registration = asyncHandler(async(req, res) => {


    const hash = await bcrypt.hash()
})