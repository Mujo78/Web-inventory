const express = require("express")
const { registration } = require("../controllers/person-controller")
const { createPersonValidator } = require("../validators/person-validator")
const validate = require("../middleware/validate")

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Gets")
})

router.get("/:id")
router.post("/registration",createPersonValidator, validate, registration)


module.exports = router