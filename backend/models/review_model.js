const mongoose = require('mongoose');

const review_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    overall_rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    category_ratings: {
        communication: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        professionalism: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        response: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        }
    },
    feedback_text: {
        type: String,
        trim: true
    },
    recommendation: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    is_featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', review_schema);
