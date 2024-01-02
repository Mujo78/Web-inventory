const mongoose = require("mongoose");
const Product_Process = require("./product-process");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    photo_url: {
      type: String,
      required: true,
    },
    product_process_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_Process",
      requried: true,
    },
    mark_up: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
