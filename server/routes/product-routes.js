const express = require("express")
const validate = require("../middleware/validate");
const { addProduct } = require("../controllers/product-controller");
const { addNewProduct } = require("../validators/product-validator");
const router = express.Router()

router.post("/add-product",addNewProduct, validate, addProduct)

module.exports = router;