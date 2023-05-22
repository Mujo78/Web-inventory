const express = require("express")
const validate = require("../middleware/validate");
const { addProduct, getProducts, getProductById, editProduct } = require("../controllers/product-controller");
const { addNewProduct } = require("../validators/product-validator");
const { authMiddleware } = require("../middleware/auth-middleware");
const router = express.Router()

router.get("/products",authMiddleware, getProducts)
router.get("/product/:id", getProductById)
router.put("/edit-product/:id", addNewProduct, validate, editProduct)
router.post("/add-product",addNewProduct, validate, addProduct)

module.exports = router;