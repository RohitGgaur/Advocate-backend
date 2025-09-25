const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Debug API calls
async function debugApiCalls() {
    console.log('🔍 Debugging API Calls...\n');

    try {
        // Test 1: Health check
        console.log('1️⃣ Testing health check...');
        try {
            const healthResponse = await axios.get(`${BASE_URL}/api/health`);
            console.log('✅ Health check successful:', healthResponse.data);
        } catch (error) {
            console.log('❌ Health check failed:', error.message);
            return;
        }

        // Test 2: Get all admins
        console.log('\n2️⃣ Testing get all admins...');
        try {
            const adminsResponse = await axios.get(`${BASE_URL}/api/admin/list`);
            console.log('✅ Get admins successful');
            console.log('📊 Response:', JSON.stringify(adminsResponse.data, null, 2));
            
            if (adminsResponse.data.admins && adminsResponse.data.admins.length > 0) {
                const adminId = adminsResponse.data.admins[0]._id;
                console.log(`👤 Found admin ID: ${adminId}`);
                
                // Test 3: Get single admin
                console.log('\n3️⃣ Testing get single admin...');
                try {
                    const singleAdminResponse = await axios.get(`${BASE_URL}/api/admin/${adminId}`);
                    console.log('✅ Get single admin successful');
                    console.log('📊 Single admin data:', JSON.stringify(singleAdminResponse.data, null, 2));
                } catch (error) {
                    console.log('❌ Get single admin failed:', error.response?.data || error.message);
                }

                // Test 4: Update admin profile
                console.log('\n4️⃣ Testing update admin profile...');
                try {
                    const updateData = {
                        username: 'DebugTest_' + Date.now(),
                        email: 'debug_' + Date.now() + '@test.com'
                    };
                    
                    const updateResponse = await axios.put(`${BASE_URL}/api/admin/${adminId}/profile`, updateData);
                    console.log('✅ Update profile successful');
                    console.log('📊 Update response:', JSON.stringify(updateResponse.data, null, 2));
                } catch (error) {
                    console.log('❌ Update profile failed:', error.response?.data || error.message);
                }

                // Test 5: Verify update
                console.log('\n5️⃣ Verifying update...');
                try {
                    const verifyResponse = await axios.get(`${BASE_URL}/api/admin/${adminId}`);
                    console.log('✅ Verify successful');
                    console.log('📊 Verified data:', JSON.stringify(verifyResponse.data, null, 2));
                } catch (error) {
                    console.log('❌ Verify failed:', error.response?.data || error.message);
                }

            } else {
                console.log('❌ No admins found in database');
            }

        } catch (error) {
            console.log('❌ Get admins failed:', error.response?.data || error.message);
        }

    } catch (error) {
        console.log('❌ General error:', error.message);
    }
}

// Run debug
debugApiCalls();

