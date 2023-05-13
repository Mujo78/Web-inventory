const express = require("express")
const { registration, editProfile } = require("../controllers/person-controller")
const { createPersonValidator } = require("../validators/person-validator")
const validate = require("../middleware/validate")
const { authMiddleware } = require("../middleware/auth-middleware")

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Gets")
})

router.get("/:id")
router.post("/registration",createPersonValidator, validate, registration)
router.post("/edit-profile/:id",authMiddleware,createPersonValidator, validate, editProfile)

module.exports = router