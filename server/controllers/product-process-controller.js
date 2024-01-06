const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Product_Process = require("../models/product-process");
const Product_Process_Item = require("../models/product-process-item");
const Material = require("../models/material");
const Product = require("../models/product");

const addProductProcess = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json(errors);
  }

  const processes = await Product_Process.find();

  const { name } = req.body;

  const newProductProcess = await Product_Process.create({
    name: name,
    price: 0,
    start_date: processes ? null : Date.now(),
    end_date: null,
  });

  return res.status(200).json(newProductProcess);
});

const editProcess = asyncHandler(async (req, res) => {
  const { name, price } = req.body;

  const updates = {};
  if (name) updates.name = name;
  if (price) updates.price = price;

  const process = await Product_Process.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true }
  );

  if (process) return res.status(200).json(process);

  return res.status(400).json("There was an error, please try again later!");
});

const getProcesses = asyncHandler(async (req, res) => {
  const { processName } = req.query;
  let query = Product_Process.find();

  if (processName) {
    query = query.where({ name: new RegExp(processName, "i") });
    const processes = await query.exec();
    if (!processes)
      return res.status(400).json("There are no processes with such name!");

    return res.status(200).json(processes);
  }
  const allProcesses = await query.exec();
  if (!allProcesses)
    return res
      .status(400)
      .json("There are no processes available at this moment!");

  return res.status(200).json(allProcesses);
});

const getProcessesInfo = asyncHandler(async (req, res) => {
  const processes = await Product_Process.find();
  if (!processes)
    return res.status(400).json("There was an error, please try again later!");

  const { finished, newOnes, activeOnes } = processes.reduce(
    (result, p) => {
      if (p.start_date !== null && p.end_date !== null) {
        result.finished += 1;
      } else if (p.start_date !== null && p.end_date === null) {
        result.activeOnes += 1;
      } else {
        result.newOnes += 1;
      }

      return result;
    },
    { finished: 0, newOnes: 0, activeOnes: 0 }
  );

  const result = {
    processesNum: processes.length,
    finished,
    newOnes,
    activeOnes,
  };

  return res.status(200).json(result);
});

const getProcessById = asyncHandler(async (req, res) => {
  const process = await Product_Process.findById(req.params.id);
  if (process) {
    const processItems = await Product_Process_Item.find({
      product_process_id: process._id,
    }).populate("material_id");
    const processById = {
      processData: process,
      processItems: processItems,
    };
    return res.status(200).json(processById);
  }
  return res.status(400).json("There was an error, please try again later!");
});

const getFreeProcesses = asyncHandler(async (req, res) => {
  //const TakenProcesses = await Product.find().distinct("product_process_id");

  //const freeProcesses = await Product_Process.find({_id: {$nin : TakenProcesses}}).select("name _id")

  const freeProcesses = await Product_Process.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "product_process_id",
        as: "products",
      },
    },
    {
      $match: {
        products: { $size: 0 },
        start_date: null,
        end_date: null,
      },
    },
    {
      $project: {
        name: 1,
        _id: 1,
      },
    },
  ]);

  if (freeProcesses.length > 0) return res.status(200).json(freeProcesses);

  return res.status(400).json("There are no free processes available.");
});

const makeProcessActive = asyncHandler(async (req, res) => {
  await Product_Process.findOneAndUpdate(
    { start_date: { $not: { $eq: null || "" } }, end_date: { $eq: null } },
    { start_date: null },
    { new: true }
  );
  const updated = await Product_Process.findByIdAndUpdate(
    req.params.id,
    { end_date: null, start_date: Date.now() },
    { new: true }
  );

  return res.status(200).json(updated);
});

const deactivateProcess = asyncHandler(async (req, res) => {
  const updated = await Product_Process.findOneAndUpdate(
    { _id: req.params.id },
    { start_date: Date.now(), end_date: Date.now() },
    { new: true }
  );
  if (!updated)
    return res
      .status(400)
      .json("Something went wrong, please try again later!");
  return res.status(200).json(updated);
});

const makeProcessUsable = asyncHandler(async (req, res) => {
  const updated = await Product_Process.findByIdAndUpdate(
    req.params.id,
    { start_date: null, end_date: null },
    { new: true }
  );
  if (!updated)
    return res
      .status(400)
      .json("Something went wrong, please try again later!");
  return res.status(200).json(updated);
});

const getMaterialsForProcessToAdd = asyncHandler(async (req, res) => {
  const all = await Product_Process_Item.find({
    product_process_id: req.params.id,
  }).distinct("material_id");
  const materials = await Material.find({
    _id: { $nin: all },
    quantity: { $gte: 1 },
  }).select("name quantity");

  if (materials) return res.status(200).json(materials);
  return res.status(304).json("There are no materials available to add!");
});

module.exports = {
  addProductProcess,
  getProcessById,
  getProcesses,
  editProcess,
  makeProcessActive,
  deactivateProcess,
  makeProcessUsable,
  getMaterialsForProcessToAdd,
  getFreeProcesses,
  getProcessesInfo,
};
