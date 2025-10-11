const router = require('express').Router();
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const transactionRoutes = require('./transaction.routes');

router.get('/', (req, res)=>{
    res.json({
        success: true,
        message: 'API is running',
        versions: {
            v1: {
                status: 'deprecated',
                deprecationDate: '2025-12-31',
                sunsetDate: '2026-03-31',
                endpoint: '/api/v1'
            },
        }
    });
})

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;