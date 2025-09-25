const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes
const auth_routes = require('./routes/auth_routes');
const blog_routes = require('./routes/blog_routes');
const admin_routes = require('./routes/admin_routes');
const contact_routes = require('./routes/contact_routes');
const review_routes = require('./routes/review_routes');

const app = express();
dotenv.config();

// Middleware
app.use(cors({
  origin: ['http://72.60.103.43:5173', 'http://72.60.103.43:5173', 'http://72.60.103.43:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cache-Control', 'Pragma', 'Expires']
}));

// Handle CORS preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma, Expires');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Request logging middleware
app.use((req, res, next) => {
  console.log('📝 REQUEST:', req.method, req.url, 'from', req.get('origin') || req.get('referer') || 'unknown');
  next();
});

// Set body parser limits BEFORE any other middleware - MAXIMUM LIMITS
app.use(express.json({ 
  limit: '500mb',
  parameterLimit: 500000
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '500mb',
  parameterLimit: 500000
}));

// MongoDB connection
mongoose.connect('mongodb+srv://gaur0423:Rohit12345@cluster0.8duo2.mongodb.net/Advocate', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ Connected to MongoDB successfully');
    console.log('📊 Database: Advocate');
}).catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if database connection fails
});

// Routes
app.use('/api/auth', auth_routes);
app.use('/api/blogs', blog_routes);
app.use('/api/admin', admin_routes);
app.use('/api/contact', contact_routes);
app.use('/api/reviews', review_routes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
