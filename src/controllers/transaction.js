// const products = require("../models/products");
// const transactions = require("../models/transactions");
// const Users = require("../models/users");

const products = require("../models/products");
const transactions = require("../models/transactions");
const Users = require("../models/users");

const createTransaction = async (req, res) => {
  try {
    const { id } = req.payload;
    const { productId, user_id, payment_method, deliveri_cost } = req.body;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const product = await products.findByPk(productId, {});
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }
    const priceProduct = product.getDataValue("price");
    const anount = priceProduct + Number(deliveri_cost);

    const data = await transactions.create({
      user_id: id,
      payment_method,
      deliveri_cost,
      productId,
      anount,
      status: "PENDING",
    });
    res.status(201).json({
      msg: "create transaction success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "create transaction failed",
      error,
    });
  }
};

// melihat semua transaction
//melihat satu transaction
const findOnetransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await transactions.findByPk(id, {
      include: [
        {
          model: products,
          as: "product",
        },
        {
          model: Users,
          as: "user",
          attributes: ["name", "email", "role"],
        },
      ],
    });
    if (!data) {
      return res.status(404).json({ msg: "transaction not found" });
    }
    res.status(200).json({ msg: "Succeess find one transaction", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal servere error", error });
  }
};
const findAllTransaction = async (req, res) => {
  try {
    const data = await transactions.findAll();

    res.status(200).json({
      msg: "success find All transaction",
      data: data,
    });
  } catch (error) {
    console.log({ error });
    res.status(401).json({
      msg: "failed find all transaction",
      error,
    });
  }
};

// update transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, user_id, payment_method, deliveri_cost, anount } =
      req.body;
    const transaction = await transactions.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ msg: "transaction failed" });
    }
    await transaction.update({
      productId,
      user_id,
      payment_method,
      deliveri_cost,
      anount,
    });
    await transaction.save();
    res.status(200).json({ transaction });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "success update transaction",
      data: transactions,
    });
  }
};

// delet transaction

const deleteTansaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactions.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ msg: "transaction not found" });
    }
    await transaction.destroy();
    await transaction.save();
    res.status(200).json({
      msg: "Success delete transaction",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createTransaction,
  findOnetransaction,
  findAllTransaction,
  updateTransaction,
  deleteTansaction,
};
