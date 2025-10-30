// src/repositories/UserRepository.js
const prisma = require('../config/database');

class UserRepository {
  static async findAll(filters = {}) {
    const {
      skip = 0,
      limit = 10,
      where = {},
      include = {},
      orderBy = { createdAt: 'desc' },
    } = filters;

    const [data, total] = await Promise.all([
      prisma.user.findMany({ skip, take: limit, where, include, orderBy }),
      prisma.user.count({ where }),
    ]);

    return { data, total };
  }

  static async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  static async create(data) {
    return prisma.user.create({ data });
  }

  static async update(id, data) {
    return prisma.user.update({ where: { id }, data });
  }

  static async delete(id) {
    return prisma.user.delete({ where: { id } });
  }
}

module.exports = UserRepository;
