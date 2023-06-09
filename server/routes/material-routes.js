const express = require("express")
const validate = require("../middleware/validate")
const { addMaterial, getMaterials,getMaterialById, editMaterial, deleteMaterial } = require("../controllers/material-controller")
const { addNewMaterial } = require("../validators/material-validator")
const { authMiddleware } = require("../middleware/auth-middleware")
const router = express.Router()

router.get("/materials", getMaterials)
router.post("/add-material", addNewMaterial, addMaterial)
router.get("/material/:id", getMaterialById)
router.delete("/delete-material/:id", deleteMaterial)
router.put("/edit-material/:id", addNewMaterial, editMaterial)

module.exports = router