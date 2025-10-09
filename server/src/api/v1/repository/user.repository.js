const prisma = require("../config/database")


class UserRepository {
  
    static async findAll(filters={}) {
        const { skip=0, limit=10, include={} } = filters;
        return prisma.user.findMany({
        skip,
        take: limit,
        include: Object.keys(include).length>0 ? include : undefined,
      })
    }

    async getUserById(id){
        return prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
    }
}

module.exports = UserRepository;