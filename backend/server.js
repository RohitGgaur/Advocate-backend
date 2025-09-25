const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

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

// Request size logging middleware
app.use((req, res, next) => {
  const contentLength = req.get('Content-Length');
  const contentType = req.get('Content-Type');
  
  console.log('📝 REQUEST RECEIVED:');
  console.log('📊 Method:', req.method);
  console.log('📊 URL:', req.url);
  console.log('📊 Content-Type:', contentType);
  console.log('📊 Content-Length:', contentLength);
  
  if (contentLength) {
    const sizeKB = (parseInt(contentLength) / 1024).toFixed(2);
    const sizeMB = (parseInt(contentLength) / (1024 * 1024)).toFixed(2);
    console.log('📊 Size:', sizeKB, 'KB /', sizeMB, 'MB');
  }
  
  next();
});

// Connect to MongoDB (optional - will use in-memory storage if not available)
mongoose.connect('mongodb://localhost:27017/judicioworks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.log('⚠️ MongoDB not available, using in-memory storage');
  console.log('To enable MongoDB, install and start MongoDB service');
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Increase timeout for large uploads
app.use((req, res, next) => {
  req.setTimeout(300000); // 5 minutes
  res.setTimeout(300000); // 5 minutes
  next();
});

// Error handling for large payloads
app.use((error, req, res, next) => {
  console.log('🚨 ERROR CAUGHT:', error.type, error.message);
  
  if (error.type === 'entity.too.large') {
    console.log('🚨 PAYLOAD TOO LARGE - Returning 413');
    return res.status(413).json({
      success: false,
      message: 'Payload too large! Maximum size allowed is 500MB.',
      error: 'Payload too large',
      statusCode: 413
    });
  }
  
  // Handle other errors
  console.log('🚨 OTHER ERROR:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error.message || 'Unknown error'
  });
});

// Import routes
const blogRoutes = require('./routes/blog_routes');
const authRoutes = require('./routes/auth_routes');
const adminRoutes = require('./routes/admin_routes');

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Judicioworks Backend API is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is healthy!',
    status: 'success',
    port: 5000,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working correctly!',
    data: {
      server: 'Express.js',
      cors: 'Enabled',
      json: 'Parsing enabled',
      timestamp: new Date().toISOString()
    }
  });
});

// Test large payload endpoint
app.post('/api/test-large', (req, res) => {
  console.log('🧪 Large payload test received');
  console.log('📊 Body size:', JSON.stringify(req.body).length, 'characters');
  res.json({
    success: true,
    message: 'Large payload received successfully',
    bodySize: JSON.stringify(req.body).length
  });
});

// Sample data removed - using MongoDB only

// In-memory routes removed - using MongoDB routes only

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📝 Blogs: http://localhost:${PORT}/api/blogs`);
  console.log(`👥 Users: http://localhost:${PORT}/api/users`);
  console.log(`📈 Stats: http://localhost:${PORT}/api/stats`);
});

module.exports = app;