const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Users = require("./users");
const products = require("./products");

const transactions = db.define(
  "transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    deliveri_cost: {
      type: DataTypes.INTEGER,
    },
    anount: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = transactions;

transactions.belongsTo(Users, { foreignKey: "user_id", as: "user" });
transactions.belongsTo(products, { foreignKey: "productId", as: "product" });
Users.hasMany(transactions, { foreignKey: "id" });
products.hasMany(transactions, { foreignKey: "id" });
