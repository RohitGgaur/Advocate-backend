const axios = require('axios');

async function testLocalAPI() {
    try {
        console.log('🧪 Testing local API endpoints...');
        
        // Test health endpoint
        console.log('1. Testing /api/health...');
        const healthResponse = await axios.get('http://localhost:5000/api/health');
        console.log('✅ Health check:', healthResponse.data);
        
        // Test auth/me endpoint
        console.log('2. Testing /api/auth/me...');
        const authResponse = await axios.get('http://localhost:5000/api/auth/me');
        console.log('✅ Auth response:', authResponse.data);
        
        // Test blogs endpoint
        console.log('3. Testing /api/blogs...');
        const blogsResponse = await axios.get('http://localhost:5000/api/blogs');
        console.log('✅ Blogs response:', blogsResponse.data);
        
        // Test admin stats endpoint
        console.log('4. Testing /api/admin/stats...');
        const statsResponse = await axios.get('http://localhost:5000/api/admin/stats');
        console.log('✅ Admin stats response:', statsResponse.data);
        
        console.log('🎉 All API endpoints are working correctly!');
        
    } catch (error) {
        console.error('❌ API test failed:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('❌ Local server is not running on port 5000');
            console.log('💡 Please start the server with: cd backend && node app.js');
        }
    }
}

testLocalAPI();
