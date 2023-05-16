const express = require("express")
const validate = require("../middleware/validate")
const { addSupplier, editSupplier, allSuppliers, supplierById, supplierMaterials } = require("../controllers/supplier-controller")
const { addNewSupplier } = require("../validators/supplier-validator")
const { authMiddleware } = require("../middleware/auth-middleware")

const Supplier = require("../models/supplier")

const router = express.Router()

router.get("/suppliers", allSuppliers)
router.get("/supplier/:id",authMiddleware, supplierById)
router.get("/supplier-material/:id", supplierMaterials)
router.post("/supplier-add",authMiddleware, addNewSupplier, validate, addSupplier)
router.put("/edit-supplier/:id", addNewSupplier, validate, editSupplier)

module.exports = router