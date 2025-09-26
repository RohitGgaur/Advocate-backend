const axios = require('axios');

const BASE_URL = 'http://72.60.103.43:5173/api/admin';

async function testAdminListAPI() {
    console.log('🧪 Testing Admin List API...\n');

    try {
        // Test 1: Get all admins list
        console.log('1️⃣ Testing GET /api/admin/list');
        console.log(`URL: ${BASE_URL}/list`);
        
        const response = await axios.get(`${BASE_URL}/list`);
        console.log('✅ Admin List Response:');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
        
        if (response.data.success && response.data.admins) {
            console.log(`\n📊 Found ${response.data.admins.length} admins:`);
            response.data.admins.forEach((admin, index) => {
                console.log(`${index + 1}. ${admin.username || admin.name || 'Unknown'} (${admin.email}) - ${admin.role} - ${admin.is_active ? 'Active' : 'Inactive'}`);
            });
        }

        // Test 2: Get admins with pagination
        console.log('\n2️⃣ Testing GET /api/admin/list with pagination');
        console.log(`URL: ${BASE_URL}/list?page=1&limit=5`);
        
        const paginatedResponse = await axios.get(`${BASE_URL}/list?page=1&limit=5`);
        console.log('✅ Paginated Response:');
        console.log('Status:', paginatedResponse.status);
        console.log('Data:', JSON.stringify(paginatedResponse.data, null, 2));

        // Test 3: Get admins with filters
        console.log('\n3️⃣ Testing GET /api/admin/list with filters');
        console.log(`URL: ${BASE_URL}/list?is_active=true`);
        
        const filteredResponse = await axios.get(`${BASE_URL}/list?is_active=true`);
        console.log('✅ Filtered Response:');
        console.log('Status:', filteredResponse.status);
        console.log('Data:', JSON.stringify(filteredResponse.data, null, 2));

        console.log('\n🎉 All Admin List API tests completed successfully!');

    } catch (error) {
        console.error('❌ Error testing Admin List API:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

// Run the tests
testAdminListAPI();


