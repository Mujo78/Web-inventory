const express = require("express")
const validate = require("../middleware/validate")
const Product_Process = require("../models/product-process")
const { addProductProcess, getProcesses, getProcessById, editProcess, makeProcessActive, deactivateProcess, makeProcessUsable, getMaterialsForProcessToAdd } = require("../controllers/product-process-controller")
const { createProductProcess, editProductProcess } = require("../validators/product-process-validator")
const { authMiddleware } = require("../middleware/auth-middleware")


const router = express.Router()
router.get("/product-processes", getProcesses)
router.get("/product-process/:id", getProcessById)
router.post("/add-product-process", createProductProcess, validate, addProductProcess)
router.put("/edit-product-process/:id", editProductProcess, validate, editProcess)
router.patch("/make-active-process/:id", makeProcessActive)
router.patch("/deactivate-process/:id", deactivateProcess)
router.patch("/make-usable-process/:id", makeProcessUsable)
router.get("/process/:id", getMaterialsForProcessToAdd)


module.exports = router;