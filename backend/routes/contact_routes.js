const express = require('express');
const router = express.Router();
const Contact = require('../models/contact_model');
const { send_email } = require('../config/nodemailer');

// Create contact form submission
router.post('/submit', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
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

        // Create new contact submission
        const contact_data = new Contact({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            subject: subject.trim(),
            message: message.trim()
        });

        const saved_contact = await contact_data.save();

        // Send email notification
        try {
            const email_result = await send_email('contact_form', {
                name: saved_contact.name,
                email: saved_contact.email,
                phone: saved_contact.phone,
                subject: saved_contact.subject,
                message: saved_contact.message
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
            message: 'Contact form submitted successfully',
            data: {
                id: saved_contact._id,
                name: saved_contact.name,
                email: saved_contact.email,
                subject: saved_contact.subject,
                status: saved_contact.status,
                created_at: saved_contact.createdAt
            }
        });

    } catch (error) {
        console.error('Error creating contact submission:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get all contact submissions (for admin)
router.get('/all', async (req, res) => {
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
                { subject: { $regex: search, $options: 'i' } }
            ];
        }

        const contacts = await Contact.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v');

        const total = await Contact.countDocuments(filter);

        res.json({
            success: true,
            data: {
                contacts,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(total / limit),
                    total_contacts: total,
                    has_next: page * limit < total,
                    has_prev: page > 1
                }
            }
        });

    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Get single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });

    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Update contact status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!status || !['new', 'read', 'replied', 'closed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Valid status is required (new, read, replied, closed)'
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact status updated successfully',
            data: contact
        });

    } catch (error) {
        console.error('Error updating contact status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Delete contact
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

module.exports = router;
