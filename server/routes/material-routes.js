const express = require("express")
const validate = require("../middleware/validate")
const { addMaterial, getMaterials,getMaterialById, editMaterial } = require("../controllers/material-controller")
const { addNewMaterial } = require("../validators/material-validator")
const { authMiddleware } = require("../middleware/auth-middleware")
const router = express.Router()

router.get("/materials", getMaterials)
router.get("/material/:id", getMaterialById)
router.post("/add-material", addNewMaterial, validate, addMaterial)
router.put("/edit-material/:id", addNewMaterial, validate, editMaterial)

module.exports = router