const prisma = require("../config/database");

class TransactionRepository {
  static async findAll(filters = {}) {
    const {
    //   startDate,
    //   endDate,
      type,
      category,
      page = 1,
      limit = 10,
    } = filters;

    const where = {};

    // Filter by date range
    // if (startDate || endDate) {
    //   where.date = {};
    //   if (startDate) where.date.gte = new Date(startDate);
    //   if (endDate) where.date.lte = new Date(endDate);
    // }

    // Filter by type (INCOME/EXPENSE)
    if (type) {
      where.type = type.toUpperCase();
    }

    // Filter by category
    if (category) {
      where.category = {
        contains: category,
        mode: "insensitive",
      };
    }

    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip,
        take: parseInt(limit),
        // orderBy: { date: "desc" },
      }),
      prisma.transaction.count({ where }),
    ]);

    return {
      data: transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async create(transactionData) {
    try {
      return await prisma.create({
        data: transactionData,
      });
    } catch (err) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}

module.exports = TransactionRepository;
