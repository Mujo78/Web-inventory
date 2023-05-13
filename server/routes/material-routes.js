const express = require("express")
const validate = require("../middleware/validate")
const { addMaterial, getMaterials,getMaterialById, editMaterial } = require("../controllers/material-controller")
const { addNewMaterial } = require("../validators/material-validator")
const { authMiddleware } = require("../middleware/auth-middleware")
const router = express.Router()

router.get("/materials",authMiddleware, getMaterials)
router.get("/material/:id",authMiddleware, getMaterialById)
router.post("/add-material",authMiddleware, addNewMaterial, validate, addMaterial)
router.put("/edit-material/:id",authMiddleware, addNewMaterial, validate, editMaterial)

module.exports = router