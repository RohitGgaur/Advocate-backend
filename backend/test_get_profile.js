const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Test get profile API
async function testGetProfile() {
    try {
        console.log('🧪 Testing Get Profile API...\n');

        // First, get all admins to find an admin ID
        console.log('1. Fetching all admins...');
        const adminsResponse = await axios.get(`${BASE_URL}/api/admin/list`);
        console.log(`✅ Found ${adminsResponse.data.admins.length} admins`);

        if (adminsResponse.data.admins.length === 0) {
            console.log('❌ No admins found. Please create an admin first.');
            return;
        }

        // Use the first admin for testing
        const adminId = adminsResponse.data.admins[0]._id;
        console.log(`👤 Testing with admin ID: ${adminId}`);

        // Test get profile
        console.log('\n2. Testing get profile...');
        const profileResponse = await axios.get(`${BASE_URL}/api/admin/${adminId}`);
        console.log('✅ Get profile successful!');
        console.log('📊 Response:', JSON.stringify(profileResponse.data, null, 2));

        // Verify the profile data
        if (profileResponse.data.success && profileResponse.data.admin) {
            const admin = profileResponse.data.admin;
            console.log('\n3. Profile Details:');
            console.log(`   Username: ${admin.username}`);
            console.log(`   Email: ${admin.email}`);
            console.log(`   Role: ${admin.role}`);
            console.log(`   Active: ${admin.is_active}`);
            console.log(`   Created: ${new Date(admin.createdAt).toLocaleString()}`);
            console.log(`   Updated: ${new Date(admin.updatedAt).toLocaleString()}`);
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        if (error.response?.status === 404) {
            console.log('💡 Admin not found. Check if the admin ID is correct.');
        } else if (error.response?.status === 400) {
            console.log('💡 Invalid admin ID format.');
        }
    }
}

// Run the test
testGetProfile();
