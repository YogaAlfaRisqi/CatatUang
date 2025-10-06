const userRoutes = require('express').Router();
const UserController = require("../controllers/UserController");


userRoutes.get("/", UserController.getAllUsers);

module.exports = userRoutes;