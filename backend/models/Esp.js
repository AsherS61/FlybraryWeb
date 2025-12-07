const mongoose = require('mongoose');

const espSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    recordedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Esp', espSchema);