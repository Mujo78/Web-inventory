const express = require("express")
const validate = require("../middleware/validate");
const { createNewProcessItem } = require("../validators/product-process-item-validator");
const { addProcessItem, getItems, getItemsForProcess,deleteItem, editItem } = require("../controllers/product-process-item-controller");
const router = express.Router()

router.get("/items",getItems)
router.get("/items/:id",getItemsForProcess)
router.post("/add-process-item", addProcessItem)
router.patch("/edit-process-item/:id",editItem)
router.delete("/item/:id", deleteItem)

module.exports = router;