const express = require('express');
const router = express.Router();
const Admin = require('../models/admin_model');

// Register new admin
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role = 'admin' } = req.body;

        // Check if admin already exists
        const existing_admin = await Admin.findOne({
            $or: [{ email }, { username }]
        });

        if (existing_admin) {
            return res.status(400).json({
                success: false,
                message: 'Admin with this email or username already exists'
            });
        }

        // Create new admin
        const admin = new Admin({
            username,
            email,
            password,
            role
        });

        await admin.save();

        res.status(201).json({
            success: true,
            message: 'Admin registered successfully',
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                is_active: admin.is_active
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error registering admin',
            error: error.message
        });
    }
});

// Login admin
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if admin is active
        if (!admin.is_active) {
            return res.status(401).json({
                success: false,
                message: 'Admin account is inactive'
            });
        }

        // Check password
        const is_valid_password = await admin.compare_password(password);
        
        if (!is_valid_password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Update last login
        admin.last_login = new Date();
        await admin.save();

        res.json({
            success: true,
            message: 'Login successful',
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                is_active: admin.is_active,
                last_login: admin.last_login
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
});

// Get current admin profile
router.get('/me', async (req, res) => {
    try {
        // For now, return a simple response
        // In real app, you'd get admin ID from session or other auth method
        res.json({
            success: true,
            message: 'Profile endpoint - implement session-based auth if needed'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});

module.exports = router;