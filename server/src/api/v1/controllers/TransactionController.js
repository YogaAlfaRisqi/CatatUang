const TransactionService = require("../../v1/services/TransactionService")

class TransactionController {
   static async getAllTransactions(req, res) {
    try {
      const {  type, category, page, limit } = req.query;
      
      const filters = {
        
        type,
        category,
        page: page || 1,
        limit: limit || 10
      };
      
      const result = await TransactionService.getAllTransactions(filters);
      
      return res.status(200).json({
        success: true,
        message: 'Transactions retrieved successfully',
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      console.error('Error in getAllTransactions:', error);
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to retrieve transactions'
      });
    }
  }
  static async create(req, res, next) {
    // const userId = req.user.userId;

    // const {title, amount, type,categoryId, date} = req.body;

    // const transaction = await TransactionService.create({})

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      // data:transaction,
    });
  }
}

module.exports = TransactionController;
