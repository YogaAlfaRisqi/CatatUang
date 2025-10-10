const userRoutes = require('express').Router();
const UserController = require("../controllers/UserController");

userRoutes.get("/", UserController.getAllUsers);
userRoutes.get("/:id", UserController.getUserById);
userRoutes.get("/", UserController.createUser);
userRoutes.get("/update/:id", UserController.updateUser);
userRoutes.get("/delete/:id", UserController.deleteUser);
userRoutes.get("/profile", UserController.profile);

module.exports = userRoutes;