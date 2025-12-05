const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name'],
        unique: true,
        maxlength: [300, 'Name too long.'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    lineId: {
        type: String,
        required: [true, 'Sign in with line please']
    },
    profile: {
        type: String,
        default: 'https://drive.google.com/file/d/1ia9j4tSsduolkj8aa-PxHpEkCvj91QOV/view?usp=sharing'
        
    }
})

module.exports = mongoose.model('User', userSchema);