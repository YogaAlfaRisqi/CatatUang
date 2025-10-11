// const TransactionService = require("../services/")

class TransactionController{
    static async create(req, res, next){
        // const userId = req.user.userId;

        // const {title, amount, type,categoryId, date} = req.body;

        // const transaction = await TransactionService.create({})

        res.status(201).json({
            success:true,
            message: 'Transaction created successfully',
            // data:transaction,
        })
    }
}

module.exports=TransactionController;