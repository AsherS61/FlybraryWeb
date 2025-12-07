const Transaction = require('../models/Transaction.js')

//@desc     See all transaction books
//@route    GET /api/v1/transactions
//@access   Public
exports.getTransactions = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 6;

        const transactions = await Transaction.find({})
            .sort({ createdAt: -1 }) 
            .limit(limit);

        return res.status(200).json({
            success: true,
            data: transactions
        })

    } catch (err) {
        console.error("Error fetching borrowing instances:", err.message);
        
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during borrowing instances retrieval.'
        });
    }
};


//@desc     Get specific transaction instance by id
//@route    GET /api/v1/transactions/:id
//@access   Public
exports.getTransaction = async (req, res, next) => {
    try {
        const txId = req.params.id;

        const transaction = await Transaction.findById(txId);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: `Transaction not found with ID: ${txId}`
            });
        }

        return res.status(200).json({
            success: true,
            data: transaction
        });

    } catch (err) {
        console.error(`Error fetching Transaction with ID ${req.params.id}:`, err.message);

        if (err.name === 'CastError') {
             return res.status(400).json({
                success: false,
                error: `Invalid Transaction ID format: ${req.params.id}`
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during single Transaction retrieval.'
        });
    }
};

//@desc     Get specific transaction by user id
//@route    GET /api/v1/transactions/user/:id
//@access   Public
exports.getTransactionsByUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 }).limit(10).populate('book');

        if (!transactions) {
            return res.status(404).json({
                success: false,
                error: `Transactions not found with ID: ${txId}`
            });
        }

        return res.status(200).json({
            success: true,
            data: transactions
        });

    } catch (err) {
        console.error(`Error fetching transactions with ID ${req.params.id}:`, err.message);

        if (err.name === 'CastError') {
             return res.status(400).json({
                success: false,
                error: `Invalid transactions ID format: ${req.params.id}`
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during single transactions retrieval.'
        });
    }
};

//@desc     Get specific transaction by book id
//@route    GET /api/v1/transactions/book/:id
//@access   Public
exports.getTransactionsByBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const transactions = await Transaction.find({ book: bookId }).sort({ createdAt: -1 }).limit(10);

        if (!transactions) {
            return res.status(404).json({
                success: false,
                error: `Transactions not found with ID: ${txId}`
            });
        }

        return res.status(200).json({
            success: true,
            data: transactions
        });

    } catch (err) {
        console.error(`Error fetching transactions with ID ${req.params.id}:`, err.message);

        if (err.name === 'CastError') {
             return res.status(400).json({
                success: false,
                error: `Invalid transactions ID format: ${req.params.id}`
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during single transactions retrieval.'
        });
    }
};