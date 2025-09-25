const mongoose = require('mongoose');
const Admin = require('./models/admin_model');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/judicioworks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

async function createDefaultAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@judicioworks.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin already exists:', existingAdmin.email);
      console.log('Admin ID:', existingAdmin._id);
      process.exit(0);
    }

    // Create default admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@judicioworks.com',
      password: 'admin123',
      role: 'super_admin',
      is_active: true
    });

    await admin.save();
    console.log('✅ Default admin created successfully!');
    console.log('Email: admin@judicioworks.com');
    console.log('Password: admin123');
    console.log('Admin ID:', admin._id);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createDefaultAdmin();

