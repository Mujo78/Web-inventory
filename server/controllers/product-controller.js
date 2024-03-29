const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const Product_Process = require("../models/product-process");

const addProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const { name, product_process_id, photo_url, mark_up } = req.body;

  if (await Product.findOne({ name }))
    return res.status(400).json("Product with that name already exist!");

  const process = await Product_Process.findById(product_process_id);

  const mark_up_modify = 1 + mark_up / 100;
  const price = (process.price * mark_up_modify).toFixed(2);

  const newOne = await Product.create({
    name: name,
    product_process_id: product_process_id,
    photo_url: photo_url,
    mark_up: mark_up,
    price,
  });

  return res.status(200).json(newOne);
});

const getProducts = asyncHandler(async (req, res) => {
  const { searchQuery, page } = req.query;

  const numPage = page ? page : 1;
  const limit = 10;
  const start = Number(numPage - 1) * limit;

  let query = Product.find();
  let data;
  let resObj = {};

  if (searchQuery) {
    query = query.where({ name: new RegExp(searchQuery.trim(), "i") });
  }

  query = query.limit(limit).skip(start);

  data = await query.exec();
  const totalQuery = Product.find(query._conditions);
  const total = await totalQuery.countDocuments();

  if (data.length > 0) {
    resObj.data = data;
    resObj.currentPage = Number(numPage);
    resObj.numOfPages = Math.ceil(total / limit);
    resObj.total = total;

    return res.status(200).json(resObj);
  }

  return res.status(400).json("There are no products available!");
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "product_process_id"
  );
  if (product) return res.status(200).json(product);

  return res.status(400).json("There was no such product in database!");
});

const editProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json(errors);
  }
  const { name, product_process_id, photo_url, mark_up, price } = req.body;

  if (name) {
    const product = await Product.findOne({ name });
    if (product && product._id.toString() !== req.params.id) {
      return res.status(400).json("Name already used!");
    }
  }

  const productToEdit = await Product.findById(req.params.id);
  const process = await Product_Process.findById(product_process_id);

  const updates = {};
  if (name !== productToEdit.name) updates.name = name;
  if (product_process_id !== productToEdit.product_process_id.toString()) {
    updates.product_process_id = product_process_id;
    updates.price = Math.round(process.price * (1 + mark_up / 100) * 100) / 100;
  }
  if (photo_url !== productToEdit.photo_url) updates.photo_url = photo_url;
  if (mark_up !== productToEdit.mark_up) {
    updates.mark_up = mark_up;
    updates.price =
      Math.round(productToEdit.price * (1 + mark_up / 100) * 100) / 100;
  }
  if (price !== productToEdit.price) {
    updates.price = price;
  }

  const newOne = await Product.findByIdAndUpdate(req.params.id, updates, {
    new: true,
  });
  if (newOne) return res.status(200).json(newOne);

  return res.status(400).json("There was an error, please try again later!");
});

module.exports = {
  getProducts,
  getProductById,
  editProduct,
  addProduct,
};
