const { Op } = require("sequelize");
const users = require("../models/users");
// menambahkan user
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, gender } = req.body;
    //memasukkan kedalam datbase
    const newUser = await users.create({
      name: name,
      email: email,
      password: password,
      phone: phone,
      gender: gender,
    });
    //memberikan respon ke client
    res.status(201).json({
      msg: "success create user ",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "failed create user",
      error,
    });
  }
};

//melihat semua user

const findAllUser = async (req, res) => {
  const { search, gender, orderBy, sortBy, limit, page } = req.query;

  // Pastikan 'limit' dan 'page' adalah angka, dan berikan nilai default jika tidak ada
  const validLimit = parseInt(limit) || 10; // Default limit = 10
  const validPage = parseInt(page) || 1; // Default page = 1
  const offset = (validPage - 1) * validLimit; // Pagination offset

  let where = {}; // Search filter
  let order = []; // Sorting filter

  // Filter pencarian berdasarkan 'name' atau 'email'
  if (search) {
    where = {
      [Op.or]: {
        name: { [Op.iLike]: "%" + search + "%" }, // Search by name
        email: { [Op.iLike]: "%" + search + "%" }, // Search by email
      },
    };
  }

  // Filter berdasarkan 'gender'
  if (gender) {
    where.gender = gender;
  }

  // Sorting berdasarkan 'orderBy' dan 'sortBy'
  if (orderBy && sortBy) {
    order = [[orderBy, sortBy]]; // Urutkan sesuai dengan 'orderBy' dan 'sortBy'
  }

  try {
    // Ambil data user dari database sesuai dengan filter yang diberikan
    const data = await users.findAll({
      where,
      order,
      limit: validLimit, // Gunakan limit yang sudah dipastikan sebagai angka
      offset: offset, // Gunakan offset yang sudah dihitung
    });

    // Berikan respons sukses
    res.status(200).json({
      msg: "Success find all users",
      data: data,
    });
  } catch (error) {
    console.error(error); // Cetak error di console
    res.status(400).json({
      msg: "Failed to fetch users", // Perbaiki pesan error
      error: error.message,
    });
  }
};

//malihat satu user
const findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await users.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// mengupdate user

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone } = req.body;
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: "user not found",
      });
    }
    await user.update({ name, email, password, phone });
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "success update user",
      data: users,
    });
  }
};

//menghapus update user

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "user not finely" });
    }
    await user.destroy();
    await user.save();
    res.status(200).json({
      msg: "succes delet user",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createUser,
  findAllUser,
  findOneUser,
  updateUser,
  deleteUser,
};
