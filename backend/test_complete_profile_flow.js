const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Test complete profile flow
async function testCompleteProfileFlow() {
    try {
        console.log('🧪 Testing Complete Profile Flow...\n');

        // Step 1: Get all admins
        console.log('1️⃣ Fetching all admins...');
        const adminsResponse = await axios.get(`${BASE_URL}/api/admin/list`);
        console.log(`✅ Found ${adminsResponse.data.admins.length} admins`);

        if (adminsResponse.data.admins.length === 0) {
            console.log('❌ No admins found. Please create an admin first.');
            return;
        }

        const adminId = adminsResponse.data.admins[0]._id;
        const originalAdmin = adminsResponse.data.admins[0];
        console.log(`👤 Testing with admin ID: ${adminId}`);
        console.log(`📝 Original username: ${originalAdmin.username}`);
        console.log(`📧 Original email: ${originalAdmin.email}`);

        // Step 2: Get profile
        console.log('\n2️⃣ Testing GET profile...');
        const getResponse = await axios.get(`${BASE_URL}/api/admin/${adminId}`);
        console.log('✅ GET profile successful!');
        console.log('📊 Profile data:', JSON.stringify(getResponse.data.admin, null, 2));

        // Step 3: Update profile
        console.log('\n3️⃣ Testing UPDATE profile...');
        const updateData = {
            username: 'UpdatedUser_' + Date.now(),
            email: 'updated_' + Date.now() + '@example.com'
        };

        const updateResponse = await axios.put(`${BASE_URL}/api/admin/${adminId}/profile`, updateData);
        console.log('✅ UPDATE profile successful!');
        console.log('📊 Updated data:', JSON.stringify(updateResponse.data.admin, null, 2));

        // Step 4: Verify update by getting profile again
        console.log('\n4️⃣ Verifying update by getting profile again...');
        const verifyResponse = await axios.get(`${BASE_URL}/api/admin/${adminId}`);
        console.log('✅ Verification successful!');
        console.log('📊 Verified data:', JSON.stringify(verifyResponse.data.admin, null, 2));

        // Step 5: Check if changes are persistent
        console.log('\n5️⃣ Checking persistence...');
        const finalResponse = await axios.get(`${BASE_URL}/api/admin/${adminId}`);
        const finalAdmin = finalResponse.data.admin;
        
        if (finalAdmin.username === updateData.username && finalAdmin.email === updateData.email) {
            console.log('✅ Changes are persistent in database!');
            console.log(`   Username: ${finalAdmin.username}`);
            console.log(`   Email: ${finalAdmin.email}`);
            console.log(`   Updated At: ${new Date(finalAdmin.updatedAt).toLocaleString()}`);
        } else {
            console.log('❌ Changes are not persistent!');
        }

        console.log('\n🎉 Complete profile flow test completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        if (error.response?.status === 404) {
            console.log('💡 Admin not found. Check if the admin ID is correct.');
        } else if (error.response?.status === 400) {
            console.log('💡 Invalid request. Check the data being sent.');
        }
    }
}

// Run the test
testCompleteProfileFlow();

