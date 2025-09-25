const axios = require('axios');

const BASE_URL = 'http://72.60.103.43:5000';

// Test username update API
async function testUsernameUpdate() {
    try {
        console.log('🧪 Testing Username Update API...\n');

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
        const currentUsername = adminsResponse.data.admins[0].username;
        console.log(`👤 Testing with admin ID: ${adminId}`);
        console.log(`📝 Current username: ${currentUsername}`);

        // Test username update
        console.log('\n2. Testing username update...');
        const newUsername = 'UpdatedUser_' + Date.now();
        const updateData = {
            username: newUsername
        };

        console.log(`🔄 Updating username to: ${newUsername}`);
        const updateResponse = await axios.put(`${BASE_URL}/api/admin/${adminId}/profile`, updateData);
        console.log('✅ Update successful!');
        console.log('📊 Response:', JSON.stringify(updateResponse.data, null, 2));

        // Verify the update by fetching the admin again
        console.log('\n3. Verifying update...');
        const verifyResponse = await axios.get(`${BASE_URL}/api/admin/list`);
        const updatedAdmin = verifyResponse.data.admins.find(admin => admin._id === adminId);
        
        if (updatedAdmin && updatedAdmin.username === newUsername) {
            console.log('✅ Verification successful!');
            console.log(`📊 Updated username: ${updatedAdmin.username}`);
            console.log(`📅 Updated at: ${updatedAdmin.updatedAt}`);
        } else {
            console.log('❌ Verification failed! Username not updated.');
        }

        // Test email update as well
        console.log('\n4. Testing email update...');
        const newEmail = 'updated_' + Date.now() + '@example.com';
        const emailUpdateData = {
            email: newEmail
        };

        console.log(`🔄 Updating email to: ${newEmail}`);
        const emailUpdateResponse = await axios.put(`${BASE_URL}/api/admin/${adminId}/profile`, emailUpdateData);
        console.log('✅ Email update successful!');
        console.log('📊 Response:', JSON.stringify(emailUpdateResponse.data, null, 2));

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        if (error.response?.status === 400) {
            console.log('💡 This might be a validation error. Check the error message above.');
        }
    }
}

// Run the test
testUsernameUpdate();
