const axios = require('axios');

const BASE_URL = 'http://72.60.103.43:5000/api';

// Test Contact API
async function testContactAPI() {
    console.log('🧪 Testing Contact API...');
    
    const contactData = {
        name: "Test User",
        email: "test@example.com",
        phone: "+91-9876543210",
        subject: "Test Subject from Postman",
        message: "This is a test message from Postman testing script."
    };

    try {
        const response = await axios.post(`${BASE_URL}/contact/submit`, contactData);
        console.log('✅ Contact API Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('❌ Contact API Error:', error.response?.data || error.message);
        return null;
    }
}

// Test Review API
async function testReviewAPI() {
    console.log('🧪 Testing Review API...');
    
    const reviewData = {
        name: "Review Tester",
        email: "reviewer@example.com",
        overall_rating: 5,
        category_ratings: {
            communication: 5,
            professionalism: 4,
            response: 5
        },
        feedback_text: "Excellent service! Highly recommended.",
        recommendation: "yes"
    };

    try {
        const response = await axios.post(`${BASE_URL}/reviews/submit`, reviewData);
        console.log('✅ Review API Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('❌ Review API Error:', error.response?.data || error.message);
        return null;
    }
}

// Test Get All Contacts
async function testGetContacts() {
    console.log('🧪 Testing Get All Contacts...');
    
    try {
        const response = await axios.get(`${BASE_URL}/contact/all`);
        console.log('✅ Get Contacts Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('❌ Get Contacts Error:', error.response?.data || error.message);
        return null;
    }
}

// Test Get All Reviews
async function testGetReviews() {
    console.log('🧪 Testing Get All Reviews...');
    
    try {
        const response = await axios.get(`${BASE_URL}/reviews/public`);
        console.log('✅ Get Reviews Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('❌ Get Reviews Error:', error.response?.data || error.message);
        return null;
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting API Tests...\n');
    
    // Test Contact API
    await testContactAPI();
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test Review API
    await testReviewAPI();
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test Get Contacts
    await testGetContacts();
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test Get Reviews
    await testGetReviews();
    console.log('\n' + '='.repeat(50) + '\n');
    
    console.log('🏁 All tests completed!');
}

// Run the tests
runAllTests().catch(console.error);
