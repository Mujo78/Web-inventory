const express = require("express")
const validate = require("../middleware/validate")
const { addSupplier } = require("../controllers/supplier-controller")
const { addNewSupplier } = require("../validators/supplier-validator")
const Supplier = require("../models/supplier")

const router = express.Router()

router.get("/suppliers", async(req, res) => {
    const allSuppliers = await Supplier.find()

    res.json(allSuppliers)
})

router.post("/supplier-add",addNewSupplier, validate, addSupplier)

module.exports = router