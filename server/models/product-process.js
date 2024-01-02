const mongoose = require("mongoose");

const productProcessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: false,
    },
    end_date: {
      type: Date,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true,
    },
  }
);

module.exports = mongoose.model("Product_Process", productProcessSchema);
