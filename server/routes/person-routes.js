const express = require("express")
const { registration, editProfile } = require("../controllers/person-controller")
const { createPersonValidator } = require("../validators/person-validator")
const validate = require("../middleware/validate")
const { authMiddleware } = require("../middleware/auth-middleware")

const router = express.Router()

router.get("/:id")
router.post("/registration",createPersonValidator, validate, registration)
router.put("/edit-profile/:id",createPersonValidator, validate, editProfile)

module.exports = router