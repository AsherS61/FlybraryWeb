const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    ISBN: {
        type: String,
        validate: {
            validator: function(v) {
                return v.length === 12;
            },
            message: props => `${props.value} is not a valid ISBN.`
        },
        required: [true, 'Every book has an ISBN, please enter one.']
    },
    name: {
        type: String,
        required: [true, 'Please add a book name.'],
        unique: true,
        maxlength: [300, 'For Shisui Meikyou'],
    },
    desc: {
        type: String,
        required: false,
        unique: false,
        maxlength: [5000, 'Please shorten it bro.']
    },
    author: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [50, 'Add Author name please.']
    },
    borrowedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    },
    status: {
        type: String,
        enum: ['available', 'borrowed', 'banned', 'missing'],
        default: 'available'
    },
    cover: {
        type: String,
        default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplay-lh.googleusercontent.com%2FiiIJq5JmLFYNI1bVz4IBHyoXs508JcEzHhOgau69bnveF9Wat51-ax9LMPVOlneKwqg&f=1&nofb=1&ipt=3c8b5e7d13937f13d1dae1c94b7acb2be2840462510dce507012af033393b882'
    }
})

module.exports = mongoose.model('Book', bookSchema);