// src/controllers/UserController.js
const UserService = require('../services/user.service');

class UserController {
  static async getAll(req, res) {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const result = await UserService.getAllUsers({
        page: Number(page),
        limit: Number(limit),
        search,
      });

      res.json({ success: true, ...result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = UserController;
