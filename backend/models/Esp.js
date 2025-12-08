const mongoose = require('mongoose');

const espSchema = new mongoose.Schema({
    temperature: {
        type: Number,
    },
    humidity: {
        type: Number,
    },
    recordedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Esp', espSchema);