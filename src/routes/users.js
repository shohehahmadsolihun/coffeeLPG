const express = require("express");

const {
  createUser,
  findAllUser,
  findOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const userRouter = require("express").Router();

userRouter.post(`/`, createUser);
userRouter.get(`/`, findAllUser);
userRouter.get(`/:id`, findOneUser);
userRouter.patch(`/:id`, updateUser);
userRouter.delete(`/:id`, deleteUser);
module.exports = userRouter;
