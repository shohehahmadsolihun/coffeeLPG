const productRouter = require("./product");
const userRouter = require("./users");
const promoRouter = require("./promos");
const transactionRouter = require("./transaction");
const authRouter = require("./auth");
const route = require("express").Router();

route.use("/product", productRouter);
route.use("/user", userRouter);
route.use("/promo", promoRouter);
route.use("/transaction", transactionRouter);
route.use("/auth", authRouter);

module.exports = route;
