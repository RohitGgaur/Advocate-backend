const axios = require('axios');

const BASE_URL = 'http://72.60.103.43:5000/api/admin';
const ADMIN_ID = '68c563623a278f13e1975998';

async function testAdminAPIs() {
    console.log('🧪 Testing Admin APIs...\n');

    try {
        // Test 1: Get single admin by ID
        console.log('1️⃣ Testing GET /api/admin/:id');
        console.log(`URL: ${BASE_URL}/${ADMIN_ID}`);
        
        const singleAdminResponse = await axios.get(`${BASE_URL}/${ADMIN_ID}`);
        console.log('✅ Single Admin Response:');
        console.log(JSON.stringify(singleAdminResponse.data, null, 2));
        console.log('\n');

        // Test 2: Get all admins list
        console.log('2️⃣ Testing GET /api/admin/list');
        console.log(`URL: ${BASE_URL}/list`);
        
        const allAdminsResponse = await axios.get(`${BASE_URL}/list`);
        console.log('✅ All Admins Response:');
        console.log(JSON.stringify(allAdminsResponse.data, null, 2));
        console.log('\n');

        // Test 3: Get admin statistics
        console.log('3️⃣ Testing GET /api/admin/stats');
        console.log(`URL: ${BASE_URL}/stats`);
        
        const statsResponse = await axios.get(`${BASE_URL}/stats`);
        console.log('✅ Admin Stats Response:');
        console.log(JSON.stringify(statsResponse.data, null, 2));
        console.log('\n');

        // Test 4: Test with query parameters
        console.log('4️⃣ Testing GET /api/admin/list with query parameters');
        console.log(`URL: ${BASE_URL}/list?page=1&limit=5&is_active=true`);
        
        const filteredAdminsResponse = await axios.get(`${BASE_URL}/list?page=1&limit=5&is_active=true`);
        console.log('✅ Filtered Admins Response:');
        console.log(JSON.stringify(filteredAdminsResponse.data, null, 2));
        console.log('\n');

        console.log('🎉 All Admin APIs tested successfully!');

    } catch (error) {
        console.error('❌ Error testing Admin APIs:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

// Run the tests
testAdminAPIs();


