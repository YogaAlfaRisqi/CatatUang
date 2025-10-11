const authRoutes = require(`express`).Router();
const AuthController = require("../controllers/AuthController");

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);
authRoutes.get('/logout', AuthController.logout);

module.exports = authRoutes;