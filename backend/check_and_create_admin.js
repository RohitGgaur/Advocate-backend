const mongoose = require('mongoose');
const Admin = require('./models/admin_model');

// Connect to MongoDB
mongoose.connect('mongodb+srv://gaur0423:Rohit12345@cluster0.8duo2.mongodb.net/Advocate', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

async function checkAndCreateAdmin() {
    try {
        console.log('🔍 Checking for existing admins...');
        
        // Check if any admin exists
        const existingAdmins = await Admin.find({});
        console.log(`📊 Found ${existingAdmins.length} existing admins`);
        
        if (existingAdmins.length > 0) {
            console.log('✅ Admins found:');
            existingAdmins.forEach(admin => {
                console.log(`  - ID: ${admin._id}`);
                console.log(`  - Username: ${admin.username}`);
                console.log(`  - Email: ${admin.email}`);
                console.log(`  - Role: ${admin.role}`);
                console.log(`  - Active: ${admin.is_active}`);
                console.log('  ---');
            });
        } else {
            console.log('❌ No admins found. Creating default admin...');
            
            // Create default admin
            const defaultAdmin = new Admin({
                username: 'admin',
                email: 'admin@advocate.com',
                password: 'admin123',
                role: 'super_admin',
                is_active: true
            });
            
            await defaultAdmin.save();
            console.log('✅ Default admin created successfully!');
            console.log(`📋 Admin ID: ${defaultAdmin._id}`);
            console.log(`📋 Username: ${defaultAdmin.username}`);
            console.log(`📋 Email: ${defaultAdmin.email}`);
            console.log(`📋 Password: admin123`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        mongoose.connection.close();
    }
}

checkAndCreateAdmin();
