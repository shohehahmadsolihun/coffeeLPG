// untuk menambahkan product (creat)

const { Op } = require("sequelize");
const products = require("../models/products");
const { search } = require("../routes");

//untuk menambahkan product
const createProduct = async (req, res) => {
  try {
    // const { id } = req.payload;
    // console.log({ id });

    // menangkap input dari user
    const { name, price, description, size } = req.body;
    // memasukkan data kedalam database

    const file = req.file ? req.file?.path : null;

    const data = await products.create({
      name: name,
      price: price,
      image: file,
      description: description,
      size: size,
    });
    //memberikan respons ke client
    res.status(201).json({
      msg: "Succes create product",
      // data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Failed create product",
      error,
    });
  }
};

//untuk melihat semua product (read)
const findAllproduct = async (req, res) => {
  const { search, orderBy, sortBy, limit, page, category } = req.query;
  const offset = (page - 1) * limit; //pagination

  let where = {}; //search
  let order = []; //sort

  // Jika ada query parameter 'search', tambahkan kondisi pencarian
  if (search) {
    where = {
      name: { [Op.iLike]: "%" + search + "%" },
    };
  }
  if (category) {
    where = {
      category: { [Op.iLike]: "%" + category + "%" },
    };
  }
  if (search && category) {
    where = {
      [Op.and]: {
        name: { [Op.iLike]: "%" + search + "%" },
        category: { [Op.iLike]: "%" + category + "%" },
      },
    };
  }
  if (orderBy && sortBy) {
    order = [[orderBy, `${sortBy}`]];
  }
  try {
    // Ambil produk dari database sesuai kondisi pencarian
    const data = await products.findAll({
      where,
      order,
      limit,
      offset,
    });

    // Berikan respons sukses
    res.status(200).json({
      msg: "Success find all products",
      data: data,
    });
  } catch (error) {
    console.error(error); // Cetak error di console
    res.status(400).json({
      msg: "Failed to fetch products", // Perbaiki pesan error sesuai fungsionalitas
      error: error.message,
    });
  }
};

//untuk melihat satu product (read)
const findOneproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await products.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

//untuk mengupdate product (put/patch)
const updateproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, size } = req.body;
    const product = await products.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }

    if (req.file) {
      await product.update({
        name,
        price,
        description,
        size,
        image: req?.file?.path,
      });
      return res.status(200).json({
        msg: "Success update product with image",
        data: products,
      });
    }

    await product.update({ name, price, description, size });
    await product.save();
    res.status(200).json({
      msg: "Success update product",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

//untuk menghapus product (delete)
const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await products.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }
    await product.destroy();
    await product.save();
    res.status(200).json({
      msg: "Success delete product",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createProduct,
  findAllproduct,
  findOneproduct,
  updateproduct,
  deleteproduct,
};
