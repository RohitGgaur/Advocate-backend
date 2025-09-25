// Simple API test script
const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
    console.log('Testing API endpoints...\n');

    // Test 1: Health check
    try {
        console.log('1. Testing health check...');
        const healthResponse = await fetch(`${API_BASE_URL}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthData.message);
    } catch (error) {
        console.error('❌ Health check failed:', error.message);
        return;
    }

    // Test 2: Public blog endpoint
    try {
        console.log('\n2. Testing public blog endpoint...');
        const blogResponse = await fetch(`${API_BASE_URL}/blogs`);
        const blogData = await blogResponse.json();
        console.log('✅ Blog endpoint response:', blogData);
        if (blogData.blogs) {
            console.log('✅ Found', blogData.blogs.length, 'blogs');
        }
    } catch (error) {
        console.error('❌ Blog endpoint failed:', error.message);
    }

    // Test 3: Admin registration
    try {
        console.log('\n3. Testing admin registration...');
        const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'testadmin',
                email: 'test@example.com',
                password: 'password123',
                role: 'admin'
            })
        });
        const registerData = await registerResponse.json();
        console.log('✅ Admin registration response:', registerData);
    } catch (error) {
        console.error('❌ Admin registration failed:', error.message);
    }

    // Test 4: Admin login
    try {
        console.log('\n4. Testing admin login...');
        const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            })
        });
        const loginData = await loginResponse.json();
        console.log('✅ Admin login response:', loginData);
    } catch (error) {
        console.error('❌ Admin login failed:', error.message);
    }

    // Test 5: Profile endpoint
    try {
        console.log('\n5. Testing profile endpoint...');
        const profileResponse = await fetch(`${API_BASE_URL}/auth/me`);
        const profileData = await profileResponse.json();
        console.log('✅ Profile endpoint response:', profileData);
    } catch (error) {
        console.error('❌ Profile endpoint failed:', error.message);
    }

    console.log('\n🎉 All tests completed!');
}

// Run the test
testAPI();
