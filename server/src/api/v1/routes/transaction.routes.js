const transactionRoutes = require(`express`).Router();
const TransactionController = require("../controllers/TransactionController");

transactionRoutes.get('/create',TransactionController.create);

module.exports= transactionRoutes;