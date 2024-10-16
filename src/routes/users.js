const express = require("express");

const {
  createUser,
  findAllUser,
  findOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

const userRouter = require("express").Router();

userRouter.post(`/`, createUser);
userRouter.get(`/`, findAllUser);
userRouter.get(`/:id`, findOneUser);
userRouter.patch(
  `/:id`,
  verifyAdmin,
  verifyToken,
  upload.single("image"),
  updateUser
);
userRouter.delete(`/:id`, deleteUser);
module.exports = userRouter;
