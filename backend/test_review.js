// Test review submission API
const axios = require('axios');

async function testReviewSubmission() {
    console.log('Testing review submission...');
    
    const reviewData = {
        name: 'Test User',
        email: 'test@example.com',
        overall_rating: 5,
        category_ratings: {
            communication: 5,
            professionalism: 4,
            response: 5
        },
        feedback_text: 'Excellent service! Highly recommended.',
        recommendation: 'yes'
    };
    
    try {
        const response = await axios.post('http://localhost:5000/api/reviews/submit', reviewData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Review submitted successfully!');
        console.log('Response:', response.data);
        
    } catch (error) {
        console.error('❌ Error submitting review:', error.response?.data || error.message);
    }
}

testReviewSubmission();
