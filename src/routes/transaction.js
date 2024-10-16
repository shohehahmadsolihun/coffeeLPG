const { Router } = require("express");
const {
  createTransaction,
  findOnetransaction,
  findAllTransaction,
  updateTransaction,
  deleteTansaction,
} = require("../controllers/transaction");
const { verifyToken } = require("../middleware/verifyToken");

const transactionRouter = Router();

transactionRouter.post("/", verifyToken, createTransaction);
transactionRouter.get("/:id", findOnetransaction);
transactionRouter.get("/", findAllTransaction);
transactionRouter.patch("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTansaction);
module.exports = transactionRouter;
