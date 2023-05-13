const express = require("express")
const router = express.Router()
const {login, changePassword, resignation} = require("../controllers/user-controller")
const validate = require("../middleware/validate")
const { loginUserValidator } = require("../validators/user-validator")
const { authMiddleware } = require("../middleware/auth-middleware")
const { adminCheck } = require("../middleware/admin-check")

router.get("/", (req, res) =>{
    res.send("Login router here")
})

router.post("/login",loginUserValidator,validate,login)
router.post("/change-password",authMiddleware,changePassword)
router.post("/resignation/:id",authMiddleware, resignation)


module.exports = router;