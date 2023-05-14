const express = require("express")
const validate = require("../middleware/validate");
const { createNewProcessItem } = require("../validators/product-process-item-validator");
const { addProcessItem, getItems, getItemsForProcess, editItem } = require("../controllers/product-process-item-controller");
const router = express.Router()

router.get("/items",getItems)
router.get("/items/:id",getItemsForProcess)
router.post("/add-process-item",createNewProcessItem, validate, addProcessItem)
router.put("/edit-process-item/:id",editItem)

module.exports = router;