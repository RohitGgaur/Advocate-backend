const express = require('express');
const router = express.Router();
const Admin = require('../models/admin_model');
const Blog = require('../models/blog_model');

// Get admin statistics
router.get('/stats', async (req, res) => {
    try {

        const total_admins = await Admin.countDocuments();
        const active_admins = await Admin.countDocuments({ is_active: true });
        const total_blogs = await Blog.countDocuments();
        const published_blogs = await Blog.countDocuments({ status: 'published' });
        const draft_blogs = await Blog.countDocuments({ status: 'draft' });
        const total_views = await Blog.aggregate([
            { $group: { _id: null, total: { $sum: '$views' } } }
        ]);

        res.json({
            success: true,
            stats: {
                total_admins,
                active_admins,
                inactive_admins: total_admins - active_admins,
                total_blogs,
                published_blogs,
                draft_blogs,
                total_views: total_views[0]?.total || 0
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching admin statistics',
            error: error.message
        });
    }
});

// Get all admins - MUST be before /:id route
router.get('/list', async (req, res) => {
    try {

        const { page = 1, limit = 10, role, is_active } = req.query;
        const query = {};

        if (role) query.role = role;
        if (is_active !== undefined) query.is_active = is_active === 'true';

        const admins = await Admin.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Admin.countDocuments(query);

        res.json({
            success: true,
            admins,
            pagination: {
                current_page: parseInt(page),
                total_pages: Math.ceil(total / limit),
                total_admins: total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching admins',
            error: error.message
        });
    }
});

// Update admin status
router.put('/:id/status', async (req, res) => {
    try {
        const { isActive } = req.body;
        const admin_id = req.params.id;

        const admin = await Admin.findByIdAndUpdate(
            admin_id,
            { is_active: isActive },
            { new: true }
        ).select('-password');

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.json({
            success: true,
            message: `Admin ${isActive ? 'activated' : 'deactivated'} successfully`,
            admin
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating admin status',
            error: error.message
        });
    }
});

// Get single admin by ID - MUST be after /list route
router.get('/:id', async (req, res) => {
    try {
        const admin_id = req.params.id;

        // Validate admin ID format
        if (!admin_id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid admin ID format'
            });
        }

        const admin = await Admin.findById(admin_id).select('-password');

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.json({
            success: true,
            admin
        });
    } catch (error) {
        console.error('Get admin error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching admin',
            error: error.message
        });
    }
});

// Update admin profile (username, email)
router.put('/:id/profile', async (req, res) => {
    try {
        const { username, email } = req.body;
        const admin_id = req.params.id;

        // Validate admin ID format
        if (!admin_id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid admin ID format'
            });
        }

        const update_data = {};
        if (username !== undefined) {
            if (username.length < 3) {
                return res.status(400).json({
                    success: false,
                    message: 'Username must be at least 3 characters long'
                });
            }
            update_data.username = username;
        }
        if (email !== undefined) {
            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email_regex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format'
                });
            }
            update_data.email = email.toLowerCase();
        }

        // Add updatedAt timestamp
        update_data.updatedAt = new Date();

        const admin = await Admin.findByIdAndUpdate(
            admin_id,
            update_data,
            { new: true, runValidators: true }
        ).select('-password');

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.json({
            success: true,
            message: 'Admin profile updated successfully',
            admin
        });
    } catch (error) {
        console.error('Update admin profile error:', error);
        
        // Handle duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                success: false,
                message: `${field} already exists`
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating admin profile',
            error: error.message
        });
    }
});

// Update admin role
router.put('/:id/role', async (req, res) => {
    try {
        const { role } = req.body;
        const admin_id = req.params.id;

        if (!['admin', 'super_admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role. Must be admin or super_admin'
            });
        }

        const admin = await Admin.findByIdAndUpdate(
            admin_id,
            { role },
            { new: true }
        ).select('-password');

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.json({
            success: true,
            message: 'Admin role updated successfully',
            admin
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating admin role',
            error: error.message
        });
    }
});

// Delete admin
router.delete('/:id', async (req, res) => {
    try {
        const admin_id = req.params.id;

        const admin = await Admin.findByIdAndDelete(admin_id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.json({
            success: true,
            message: 'Admin deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting admin',
            error: error.message
        });
    }
});

module.exports = router;
