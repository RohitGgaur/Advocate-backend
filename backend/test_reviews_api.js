const axios = require('axios');

const BASE_URL = 'http://72.60.103.43:5173/api';

async function testReviewsAPI() {
    console.log('🧪 Testing Reviews API...\n');

    try {
        // Test 1: GET Public Reviews
        console.log('1️⃣ Testing GET /reviews/public...');
        const getResponse = await axios.get(`${BASE_URL}/reviews/public`);
        console.log('✅ GET Reviews Response:');
        console.log(JSON.stringify(getResponse.data, null, 2));
        console.log('\n' + '='.repeat(50) + '\n');

        // Test 2: POST New Review
        console.log('2️⃣ Testing POST /reviews/submit...');
        const reviewData = {
            name: "Test User from Script",
            email: "test@example.com",
            overall_rating: 5,
            category_ratings: {
                communication: 5,
                professionalism: 4,
                response: 5
            },
            feedback_text: "This is a test review from the API testing script. Great service!",
            recommendation: "yes"
        };

        const postResponse = await axios.post(`${BASE_URL}/reviews/submit`, reviewData);
        console.log('✅ POST Review Response:');
        console.log(JSON.stringify(postResponse.data, null, 2));
        console.log('\n' + '='.repeat(50) + '\n');

        // Test 3: GET Reviews Again (to see the new review)
        console.log('3️⃣ Testing GET /reviews/public again...');
        const getResponse2 = await axios.get(`${BASE_URL}/reviews/public`);
        console.log('✅ GET Reviews Response (after adding new review):');
        console.log(JSON.stringify(getResponse2.data, null, 2));

    } catch (error) {
        console.error('❌ Error testing API:', error.response?.data || error.message);
    }
}

// Run the test
testReviewsAPI();
