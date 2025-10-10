const authRoutes = require(`express`).Router();
const AuthController = require("../controllers/AuthController");

authRoutes.post('/register', AuthController.register);

module.exports = authRoutes;