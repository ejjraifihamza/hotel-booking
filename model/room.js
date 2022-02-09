const mongoose = require("mongoose");

const Room = mongoose.model('Room',
    new mongoose.Schema({
        type: {
            type: String
        },
        price: {
            type: Number
        },
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Hotel'
        },
        imagesRoom: {
            type: Array,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }));

module.exports = Room