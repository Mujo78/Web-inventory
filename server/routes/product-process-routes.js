const express = require("express")
const validate = require("../middleware/validate")
const Product_Process = require("../models/product-process")
const { addProductProcess } = require("../controllers/product-process-controller")
const { creatProductProcess } = require("../validators/product-process-validator")

const router = express.Router()

router.post("/add-product-process", creatProductProcess, validate, addProductProcess)


module.exports = router;