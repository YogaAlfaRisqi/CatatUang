// src/services/UserService.js
const UserRepository = require('../repository/UserRepository');

class UserService {
  static async getAllUsers({ page = 1, limit = 10, search }) {
    const skip = (page - 1) * limit;

    const where = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
      ];
    }

    const { data, total } = await UserRepository.findAll({ skip, limit, where });

    return {
      users: data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  static async createUser(payload) {
    // Bisa tambahkan validasi di sini
    return UserRepository.create(payload);
  }

  static async updateUser(id, payload) {
    return UserRepository.update(id, payload);
  }

  static async deleteUser(id) {
    return UserRepository.delete(id);
  }
}

module.exports = UserService;
