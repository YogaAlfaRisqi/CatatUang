const prisma = require("../config/database");

class UserRepository {
  static async findByIdentifier(identifier) {
    return prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });
  }

  static async findByEmail(email) {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async findById(id){
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async findAll(filters = {}) {
    const { skip = 0, limit = 10, include = {} } = filters;
    return prisma.user.findMany({
      skip,
      take: limit,
      include: Object.keys(include).length > 0 ? include : undefined,
    });
  }

  static async create(userData) {
    try {
      return prisma.user.create({
        data: userData,
      });
    } catch {
      err;
    }
    throw new Error(`Database error: ${error.message}`);
  }
}

module.exports = UserRepository;
