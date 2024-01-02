const mongoose = require("mongoose");
const Material = require("./material");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    pdv: {
      type: Number,
      required: true,
    },
    phone_number: {
      type: String,
      unique: true,
      maxlength: 12,
    },
    contact_person: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    end_date: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "start_date",
      updatedAt: true,
    },
  }
);

supplierSchema.pre("remove", async function () {
  try {
    await Material.deleteMany({ supplier_id: this._id });
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("Supplier", supplierSchema);
