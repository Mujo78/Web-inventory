const express = require("express")
const validate = require("../middleware/validate");
const { createNewProcessItem } = require("../validators/product-process-item-validator");
const { addProcessItem } = require("../controllers/product-process-item-controller");
const router = express.Router()


router.post("/add-process-item",createNewProcessItem, validate, addProcessItem)

module.exports = router;