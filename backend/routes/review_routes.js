const express = require('express');
const router = express.Router();
const Review = require('../models/review_model');
const { send_email } = require('../config/nodemailer');

// Create review submission
router.post('/submit', async (req, res) => {
    try {
        const { 
            name, 
            email, 
            overall_rating, 
            category_ratings, 
            feedback_text, 
            recommendation 
        } = req.body;

        // Validate required fields
        if (!name || !email || !overall_rating || !category_ratings || !recommendation) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, overall rating, category ratings, and recommendation are required'
            });
        }

        // Validate email format
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email_regex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Validate overall rating
        if (overall_rating < 1 || overall_rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Overall rating must be between 1 and 5'
            });
        }

        // Validate category ratings
        const { communication, professionalism, response } = category_ratings;
        if (!communication || !professionalism || !response) {
            return res.status(400).json({
                success: false,
                message: 'All category ratings are required'
            });
        }

        if (communication < 1 || communication > 5 || 
            professionalism < 1 || professionalism > 5 || 
            response < 1 || response > 5) {
            return res.status(400).json({
                success: false,
                message: 'Category ratings must be between 1 and 5'
            });
        }

        // Validate recommendation
        if (!['yes', 'no'].includes(recommendation)) {
            return res.status(400).json({
                success: false,
                message: 'Recommendation must be either "yes" or "no"'
            });
        }

        // Create new review
        const review_data = new Review({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            overall_rating: parseInt(overall_rating),
            category_ratings: {
                communication: parseInt(communication),
                professionalism: parseInt(professionalism),
                response: parseInt(response)
            },
            feedback_text: feedback_text ? feedback_text.trim() : '',
            recommendation
        });

        const saved_review = await review_data.save();

        // Send email notification
        try {
            const email_result = await send_email('review_submission', {
                name: saved_review.name,
                email: saved_review.email,
                overall_rating: saved_review.overall_rating,
                category_ratings: saved_review.category_ratings,
                feedback_text: saved_review.feedback_text,
                recommendation: saved_review.recommendation
            });

            if (!email_result.success) {
                console.error('Failed to send email notification:', email_result.error);
                // Don't fail the request if email fails, just log it
            } else {
                console.log('Email sent successfully to gaur0423@gmail.com');
            }
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Don't fail the request if email fails, just log it
        }

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            data: {
                id: saved_review._id,
                name: saved_review.name,
                overall_rating: saved_review.overall_rating,
                recommendation: saved_review.recommendation,
                status: saved_review.status,
                created_at: saved_review.createdAt
            }
        });

    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get ALL reviews with full details (for testing)
router.get('/all-details', async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;
        const skip = (page - 1) * limit;

        const reviews = await Review.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Review.countDocuments({});

        res.json({
            success: true,
            message: 'All reviews fetched successfully',
            data: {
                reviews: reviews,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(total / limit),
                    total_reviews: total,
                    has_next: page < Math.ceil(total / limit),
                    has_prev: page > 1
                }
            }
        });
    } catch (error) {
        console.error('Error fetching all reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get all reviews (public - only approved reviews)
router.get('/public', async (req, res) => {
    try {
        const { page = 1, limit = 10, featured_only = false } = req.query;
        const skip = (page - 1) * limit;

        // Build filter object
        let filter = { status: 'approved' };
        if (featured_only === 'true') {
            filter.is_featured = true;
        }

        const reviews = await Review.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .select('name overall_rating category_ratings feedback_text recommendation is_featured createdAt');

        const total = await Review.countDocuments(filter);

        res.json({
            success: true,
            data: {
                reviews,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(total / limit),
                    total_reviews: total,
                    has_next: page * limit < total,
                    has_prev: page > 1
                }
            }
        });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get all reviews (admin - all reviews)
router.get('/admin/all', async (req, res) => {
    try {
        const { page = 1, limit = 10, status, search } = req.query;
        const skip = (page - 1) * limit;

        // Build filter object
        let filter = {};
        if (status) {
            filter.status = status;
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { feedback_text: { $regex: search, $options: 'i' } }
            ];
        }

        const reviews = await Review.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v');

        const total = await Review.countDocuments(filter);

        res.json({
            success: true,
            data: {
                reviews,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(total / limit),
                    total_reviews: total,
                    has_next: page * limit < total,
                    has_prev: page > 1
                }
            }
        });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get single review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.json({
            success: true,
            data: review
        });

    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Update review status (admin)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Valid status is required (pending, approved, rejected)'
            });
        }

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.json({
            success: true,
            message: 'Review status updated successfully',
            data: review
        });

    } catch (error) {
        console.error('Error updating review status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Toggle featured status (admin)
router.patch('/:id/featured', async (req, res) => {
    try {
        const { is_featured } = req.body;
        
        if (typeof is_featured !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'is_featured must be a boolean value'
            });
        }

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { is_featured },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.json({
            success: true,
            message: `Review ${is_featured ? 'featured' : 'unfeatured'} successfully`,
            data: review
        });

    } catch (error) {
        console.error('Error updating review featured status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Delete review (admin)
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.json({
            success: true,
            message: 'Review deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get review statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const total_reviews = await Review.countDocuments();
        const approved_reviews = await Review.countDocuments({ status: 'approved' });
        const pending_reviews = await Review.countDocuments({ status: 'pending' });
        const featured_reviews = await Review.countDocuments({ is_featured: true });

        // Calculate average ratings
        const avg_ratings = await Review.aggregate([
            { $match: { status: 'approved' } },
            {
                $group: {
                    _id: null,
                    avg_overall: { $avg: '$overall_rating' },
                    avg_communication: { $avg: '$category_ratings.communication' },
                    avg_professionalism: { $avg: '$category_ratings.professionalism' },
                    avg_response: { $avg: '$category_ratings.response' }
                }
            }
        ]);

        const recommendation_stats = await Review.aggregate([
            { $match: { status: 'approved' } },
            {
                $group: {
                    _id: '$recommendation',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            success: true,
            data: {
                total_reviews,
                approved_reviews,
                pending_reviews,
                featured_reviews,
                average_ratings: avg_ratings[0] || {
                    avg_overall: 0,
                    avg_communication: 0,
                    avg_professionalism: 0,
                    avg_response: 0
                },
                recommendation_breakdown: recommendation_stats
            }
        });

    } catch (error) {
        console.error('Error fetching review stats:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

module.exports = router;
