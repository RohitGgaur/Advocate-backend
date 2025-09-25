const axios = require('axios');

const BASE_URL = 'http://72.60.103.43:5000';

// Test direct backend connection
async function testDirectBackend() {
    try {
        console.log('🔍 Testing Direct Backend Connection...\n');

        // Test 1: Health check
        console.log('1️⃣ Testing health check...');
        const healthResponse = await axios.get(`${BASE_URL}/api/health`);
        console.log('✅ Health check successful:', healthResponse.data);

        // Test 2: Get all admins
        console.log('\n2️⃣ Testing get all admins...');
        const adminsResponse = await axios.get(`${BASE_URL}/api/admin/list`);
        console.log('✅ Get admins successful');
        console.log('📊 Total admins:', adminsResponse.data.admins.length);
        
        if (adminsResponse.data.admins.length > 0) {
            const admin = adminsResponse.data.admins[0];
            console.log('👤 First admin:', {
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                is_active: admin.is_active,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt
            });

            // Test 3: Get single admin by ID
            console.log('\n3️⃣ Testing get single admin by ID...');
            const singleAdminResponse = await axios.get(`${BASE_URL}/api/admin/${admin._id}`);
            console.log('✅ Get single admin successful');
            console.log('📊 Single admin data:', JSON.stringify(singleAdminResponse.data, null, 2));

            // Test 4: Update admin profile
            console.log('\n4️⃣ Testing update admin profile...');
            const updateData = {
                username: 'Rohit Gaur Updated',
                email: 'gaur0423@gmail.com'
            };
            
            const updateResponse = await axios.put(`${BASE_URL}/api/admin/${admin._id}/profile`, updateData);
            console.log('✅ Update profile successful');
            console.log('📊 Updated data:', JSON.stringify(updateResponse.data, null, 2));

            // Test 5: Verify update
            console.log('\n5️⃣ Verifying update...');
            const verifyResponse = await axios.get(`${BASE_URL}/api/admin/${admin._id}`);
            console.log('✅ Verify successful');
            console.log('📊 Final data:', JSON.stringify(verifyResponse.data, null, 2));

        } else {
            console.log('❌ No admins found in database');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Backend server is not running. Please start it with: node app.js');
        }
    }
}

// Run the test
testDirectBackend();

