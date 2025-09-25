const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const admin_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'super_admin'],
        default: 'admin'
    },
    is_active: {
        type: Boolean,
        default: true
    },
    last_login: {
        type: Date
    }
}, {
    timestamps: true
});

// Hash password before saving
admin_schema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
admin_schema.methods.compare_password = async function(candidate_password) {
    return await bcrypt.compare(candidate_password, this.password);
};

module.exports = mongoose.model('Admin', admin_schema);
