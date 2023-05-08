const express = require("express")
const router = express.Router()
const {login} = require("../controllers/user-controller")
const validate = require("../middleware/validate")
const { loginUserValidator } = require("../validators/user-validator")

router.get("/", (req, res) =>{
    res.send("Login router here")
})

router.post("/login",loginUserValidator,validate,login)

module.exports = router;