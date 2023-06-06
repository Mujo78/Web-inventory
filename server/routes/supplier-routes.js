const express = require("express")
const validate = require("../middleware/validate")
const { addSupplier, editSupplier, allSuppliers, supplierById, supplierMaterials, suppliersMaterials } = require("../controllers/supplier-controller")
const { addNewSupplier } = require("../validators/supplier-validator")
const { authMiddleware } = require("../middleware/auth-middleware")

const Supplier = require("../models/supplier")

const router = express.Router()

router.get("/suppliers", allSuppliers)
router.get("/supplier/:id", supplierById)
router.get("/supplier-material/:id", supplierMaterials)
router.post("/supplier-add", addNewSupplier, addSupplier)
router.put("/edit-supplier/:id", addNewSupplier, editSupplier)
router.get("/supplier-materials", suppliersMaterials)
module.exports = router