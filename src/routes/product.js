const {
  createProduct,
  findAllproduct,
  findOneproduct,
  updateproduct,
  deleteproduct,
} = require("../controllers/product");
const upload = require("../middleware/upload");
const { verifyToken, verifyAdmin } = require("../middleware/verifyToken");

const productRouter = require("express").Router();

productRouter.post(`/`, verifyAdmin, upload.single("image"), createProduct);
productRouter.get(`/`, findAllproduct);
productRouter.get(`/:id`, findOneproduct);
productRouter.patch(`/:id`, upload.single("image"), updateproduct);
productRouter.delete(`/:id`, deleteproduct);

module.exports = productRouter;
