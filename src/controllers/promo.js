const { Op } = require("sequelize");
const promos = require("../models/promo");

const createPromo = async (req, res) => {
  try {
    const { name, code, discount, description, size } = req.body;

    const file = req.file ? req.file?.path : null;
    const data = await promos.create({
      name: name,
      image: file,
      code: code,
      discount: discount,
      description: description,
      size: size,
    });
    res.status(201).json({
      msg: "success create promo",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "failed create promo",
      error,
    });
  }
};

//melihat semua promo

const findAllPromo = async (req, res) => {
  const {
    search = "",
    orderBy = "id",
    sortBy = "ASC",
    limit = "10",
    page = "2",
    category = "",
  } = req.query;
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
    // Ambil promo dari database sesuai kondisi pencarian
    const data = await promos.findAll({
      where,
      order,
      limit,
      offset,
    });

    // Berikan respons sukses
    res.status(200).json({
      msg: "Success find all promos",
      data: data,
    });
  } catch (error) {
    console.error(error); // Cetak error di console
    res.status(400).json({
      msg: "Failed to fetch promos",
      error: error.message,
    });
  }
};

//melihat satu promo

const findOnePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await promos.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// update promo

const updatePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, discount, description, size } = req.body;
    const promo = await promos.findByPk(id);

    if (!promo) {
      return res.status(404).json({
        msg: "Promo not found",
      });
    }

    if (req.file) {
      // Jika ada file gambar di upload, perbarui juga gambar promo
      await promo.update({
        name,
        code,
        discount,
        description,
        size,
        image: req?.file?.path, // tambahkan path gambar jika diupload
      });
      return res.status(200).json({
        msg: "Success update promo with image",
        data: promo,
      });
    }

    // Jika tidak ada file gambar yang diupload, perbarui data promo tanpa gambar
    await promo.update({ name, code, discount, description, size });
    await promo.save();

    res.status(200).json({
      msg: "Success update promo",
      data: promo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Failed to update promo",
      error: error.message,
    });
  }
};

// menghapus promo

const deletePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const promo = await promos.findByPk(id);
    if (!promo) {
      return res.status(404).json({ msg: "promo not finely" });
    }
    await promo.destroy();
    await promo.save();
    res.status(200).json({
      msg: "succes delet promo",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createPromo,
  findAllPromo,
  findOnePromo,
  updatePromo,
  deletePromo,
};
