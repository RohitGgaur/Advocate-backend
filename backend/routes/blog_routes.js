const express = require('express');
const router = express.Router();
const Blog = require('../models/blog_model');

// Get all blogs (public endpoint)
router.get('/', async (req, res) => {
    try {
        const { status, page = 1, limit = 50 } = req.query;
        const query = {};
        
        // Only show published blogs for public access
        if (status) {
            query.status = status;
        } else {
            query.status = 'published';
        }

        const blogs = await Blog.find(query)
            .populate('author', 'username email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Blog.countDocuments(query);

        res.json({
            success: true,
            blogs,
            pagination: {
                current_page: parseInt(page),
                total_pages: Math.ceil(total / limit),
                total_blogs: total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blogs',
            error: error.message
        });
    }
});

// Get single blog by ID (public endpoint)
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username email');
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Only show published blogs for public access
        if (blog.status !== 'published') {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Increment view count
        blog.views += 1;
        await blog.save();

        res.json({
            success: true,
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blog',
            error: error.message
        });
    }
});

// Create new blog
router.post('/', async (req, res) => {
    try {
        const { title, excerpt, content, image, status = 'draft' } = req.body;

        if (!title || !excerpt || !content || !image) {
            return res.status(400).json({
                success: false,
                message: 'Title, excerpt, content, and image are required'
            });
        }

        const blog = new Blog({
            title,
            excerpt,
            content,
            image,
            status,
            author: '64f8a1b2c1d2e3f4a5b6c7d8' // Default admin ID
        });

        await blog.save();
        await blog.populate('author', 'username email');

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating blog',
            error: error.message
        });
    }
});

// Update blog
router.put('/:id', async (req, res) => {
    try {
        const { title, excerpt, content, image, status } = req.body;
        
        // Validate blog ID format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid blog ID format'
            });
        }
        
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Prepare update data
        const update_data = {};
        if (title !== undefined) update_data.title = title;
        if (excerpt !== undefined) update_data.excerpt = excerpt;
        if (content !== undefined) update_data.content = content;
        if (image !== undefined) update_data.image = image;
        if (status !== undefined) update_data.status = status;

        // Add updatedAt timestamp
        update_data.updatedAt = new Date();

        const updated_blog = await Blog.findByIdAndUpdate(
            req.params.id,
            update_data,
            { new: true, runValidators: true }
        ).populate('author', 'username email');

        if (!updated_blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found after update'
            });
        }

        res.json({
            success: true,
            message: 'Blog updated successfully',
            blog: updated_blog
        });
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating blog',
            error: error.message
        });
    }
});

// Delete blog
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // No auth check for now

        await Blog.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting blog',
            error: error.message
        });
    }
});

// Get blog statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const total_blogs = await Blog.countDocuments();
        const published_blogs = await Blog.countDocuments({ status: 'published' });
        const draft_blogs = await Blog.countDocuments({ status: 'draft' });
        const total_views = await Blog.aggregate([
            { $group: { _id: null, total: { $sum: '$views' } } }
        ]);

        res.json({
            success: true,
            stats: {
                total_blogs,
                published_blogs,
                draft_blogs,
                total_views: total_views[0]?.total || 0
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blog statistics',
            error: error.message
        });
    }
});

module.exports = router;
