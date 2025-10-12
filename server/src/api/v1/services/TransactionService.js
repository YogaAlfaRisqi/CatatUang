const TransactionRepository = require("../repository/TransactionRepository");

class TransactionService {
  static async getAllTransactions(filters) {
    try {
      // Validate pagination parameters
      if (filters.page && filters.page < 1) {
        const error = new Error('Page must be greater than 0');
        error.statusCode = 400;
        throw error;
      }

      if (filters.limit && filters.limit < 1) {
        const error = new Error('Limit must be greater than 0');
        error.statusCode = 400;
        throw error;
      }

    //   // Validate date filters
    //   if (filters.startDate && !this.isValidDate(filters.startDate)) {
    //     const error = new Error('Invalid start date format. Use YYYY-MM-DD');
    //     error.statusCode = 400;
    //     throw error;
    //   }

    //   if (filters.endDate && !this.isValidDate(filters.endDate)) {
    //     const error = new Error('Invalid end date format. Use YYYY-MM-DD');
    //     error.statusCode = 400;
    //     throw error;
    //   }

      // Validate type filter
      if (filters.type && !['INCOME', 'EXPENSE'].includes(filters.type.toUpperCase())) {
        const error = new Error('Type must be either INCOME or EXPENSE');
        error.statusCode = 400;
        throw error;
      }

      const result = await TransactionRepository.findAll(filters);
      return result;
    } catch (error) {
      if (error.statusCode) throw error;
      throw new Error(`Failed to fetch transactions: ${error.message}`);
    }
  }

  async create() {}
}

module.exports = TransactionService;
