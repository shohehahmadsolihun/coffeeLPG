// const express = require("express");

const {
  createPromo,
  findAllPromo,
  findOnePromo,
  updatePromo,
  deletePromo,
} = require("../controllers/promo");
const upload = require("../middleware/upload");

const promoRouter = require("express").Router();

promoRouter.post(`/`, upload.single("image"), createPromo);
promoRouter.get(`/`, findAllPromo);
promoRouter.get(`/:id`, findOnePromo);
promoRouter.patch(`/:id`, updatePromo);
promoRouter.delete(`/:id`, deletePromo);

module.exports = promoRouter;
