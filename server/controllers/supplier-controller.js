const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const Supplier = require("../models/supplier");
const Material = require("../models/material");

const addSupplier = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { name, pdv, phone_number, contact_person, email } = req.body;

  const newOne = await Supplier.create({
    name: name,
    uid: uuidv4(),
    pdv: pdv,
    phone_number: phone_number,
    contact_person: contact_person,
    email: email,
    end_date: null,
  });

  return res.status(200).json(newOne);
});

const allSuppliers = asyncHandler(async (req, res) => {
  const { searchQuery, page, limit } = req.query;
  let query = Supplier.find();
  let data;

  let pageNum = page ? page : 1;
  const start = limit && (Number(pageNum) - 1) * limit;

  if (searchQuery) {
    query = query.where({
      $or: [
        { name: new RegExp(searchQuery.trim(), "i") },
        { contact_person: new RegExp(searchQuery.trim(), "i") },
      ],
    });
  }

  const totalQuery = Supplier.find(query._conditions);
  const total = await totalQuery.countDocuments();
  let resObj = {};

  if (limit) {
    query = query.limit(limit).skip(start);
  }

  data = await query.exec();

  if (data.length > 0) {
    resObj.data = data;
    resObj.currentPage = Number(pageNum);
    resObj.numOfPages = Math.ceil(total / limit);

    return res.status(200).json(resObj);
  }

  res
    .status(400)
    .json("There are no suppliers with such name or contact name!");
});

const supplierById = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (supplier) return res.status(200).json(supplier);

  return res.status(400).json("There are no suppliers available!");
});

const editSupplier = asyncHandler(async (req, res) => {
  const { name, pdv, phone_number, contact_person, email, end_date } = req.body;

  const updates = {};

  if (name) updates.name = name;
  if (pdv) updates.pdv = pdv;
  if (phone_number) updates.phone_number = phone_number;
  if (contact_person) updates.contact_person = contact_person;
  if (email) updates.email = email;
  if (end_date) updates.end_date = end_date;

  const supplier = await Supplier.findByIdAndUpdate(
    { _id: req.params.id },
    updates,
    { new: true }
  );

  if (!supplier) {
    res.status(400);
    throw new Error("There was some error, try again later or report problem!");
  }

  return res.status(200).json(supplier);
});

const supplierMaterials = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (!supplier) {
    res.status(400);
    throw new Error("There was an error, please try again later!");
  }

  const supplierMaterials = await Material.find({ supplier_id: supplier.id });
  if (supplierMaterials.length > 0)
    return res.status(200).json(supplierMaterials);

  res.status(400).json("There are no materials from this supplier!");
});

const suppliersMaterials = asyncHandler(async (req, res) => {
  const supplierMaterialCounts = await Supplier.aggregate([
    {
      $lookup: {
        from: "materials",
        localField: "_id",
        foreignField: "supplier_id",
        as: "materials",
      },
    },
    {
      $project: {
        supplier: "$name",
        materialsCount: { $size: "$materials" },
      },
    },
    {
      $match: {
        materialsCount: { $gte: 1 },
      },
    },
  ]);

  const materialsQuantity = await Material.find()
    .sort({ quantity: -1 })
    .select("name quantity")
    .limit(5);

  return res.status(200).json({
    materialsQuantity,
    supplierMaterialCounts,
  });
});

module.exports = {
  addSupplier,
  allSuppliers,
  supplierById,
  editSupplier,
  supplierMaterials,
  suppliersMaterials,
};
