const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Test real backend connection
async function testRealBackendConnection() {
    console.log('🔍 Testing Real Backend Connection...\n');

    try {
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
            console.log('👤 First admin from database:', {
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                is_active: admin.is_active,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt
            });

            // Test 3: Get single admin by ID (this is what frontend calls)
            console.log('\n3️⃣ Testing get single admin by ID (frontend API call)...');
            const singleAdminResponse = await axios.get(`${BASE_URL}/api/admin/${admin._id}`);
            console.log('✅ Get single admin successful');
            console.log('📊 Single admin data (what frontend receives):', JSON.stringify(singleAdminResponse.data, null, 2));

            // Test 4: Update admin profile
            console.log('\n4️⃣ Testing update admin profile...');
            const updateData = {
                username: 'Rohit Gaur Real Update',
                email: 'gaur0423@gmail.com'
            };
            
            const updateResponse = await axios.put(`${BASE_URL}/api/admin/${admin._id}/profile`, updateData);
            console.log('✅ Update profile successful');
            console.log('📊 Updated data (what frontend receives):', JSON.stringify(updateResponse.data, null, 2));

            // Test 5: Verify update by getting profile again
            console.log('\n5️⃣ Verifying update by getting profile again...');
            const verifyResponse = await axios.get(`${BASE_URL}/api/admin/${admin._id}`);
            console.log('✅ Verify successful');
            console.log('📊 Final data from database:', JSON.stringify(verifyResponse.data, null, 2));

            // Test 6: Check if data is actually in database
            console.log('\n6️⃣ Checking all admins again to verify database persistence...');
            const finalAdminsResponse = await axios.get(`${BASE_URL}/api/admin/list`);
            const updatedAdmin = finalAdminsResponse.data.admins.find(a => a._id === admin._id);
            
            if (updatedAdmin && updatedAdmin.username === updateData.username) {
                console.log('✅ Database persistence confirmed! Changes are saved in database.');
                console.log('📊 Final admin data from database:', {
                    _id: updatedAdmin._id,
                    username: updatedAdmin.username,
                    email: updatedAdmin.email,
                    updatedAt: updatedAdmin.updatedAt
                });
            } else {
                console.log('❌ Database persistence failed! Changes not saved in database.');
            }

        } else {
            console.log('❌ No admins found in database');
        }

        console.log('\n🎉 Real backend connection test completed successfully!');
        console.log('💡 If you see this message, your backend is working correctly with real database.');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Backend server is not running. Please start it with: node app.js');
        } else if (error.response?.status === 404) {
            console.log('💡 API endpoint not found. Check if routes are properly configured.');
        } else if (error.response?.status === 500) {
            console.log('💡 Server error. Check backend logs for details.');
        }
    }
}

// Run the test
testRealBackendConnection();


