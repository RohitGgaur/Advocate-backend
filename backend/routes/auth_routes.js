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
        console.log('🔍 /api/auth/me endpoint called - PRODUCTION VERSION');
        console.log('🔍 Request headers:', req.headers);
        console.log('🔍 Request origin:', req.get('origin'));
        
        // For now, return the hardcoded admin data
        // In a real app, you'd get admin ID from JWT token or session
        const admin_id = '68c563623a278f13e1975998';
        
        console.log('🔍 Looking for admin with ID:', admin_id);
        
        // Validate admin ID format
        if (!admin_id.match(/^[0-9a-fA-F]{24}$/)) {
            console.log('❌ Invalid admin ID format');
            return res.status(400).json({
                success: false,
                message: 'Invalid admin ID format'
            });
        }

        const admin = await Admin.findById(admin_id).select('-password');
        console.log('🔍 Admin found:', admin ? 'YES' : 'NO');

        if (!admin) {
            console.log('❌ Admin not found in database');
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        console.log('✅ Admin data retrieved successfully');
        console.log('📊 Admin details:', {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
            is_active: admin.is_active
        });

        const response = {
            success: true,
            admin: {
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                is_active: admin.is_active,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
                last_login: admin.last_login
            },
            debug: "PRODUCTION_VERSION_2024"
        };

        console.log('📤 Sending response:', response);
        res.json(response);
    } catch (error) {
        console.error('❌ Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});

module.exports = router;