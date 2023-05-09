const express = require("express")
const validate = require("../middleware/validate")
const { addMaterial } = require("../controllers/material-controller")
const { addNewMaterial } = require("../validators/material-validator")
const router = express.Router()

router.get("/materials", async(req, res) => {
    res.send("Materials here!")
})

router.post("/add-material", addNewMaterial, validate, addMaterial)

module.exports = router