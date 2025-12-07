const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref:'Book',
        required: true
    },
    borrowDate: { type: Date, required: true },
    returnBy: { type: Date, required: true },
    returnDate: { type: Date },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Transaction', transactionSchema);