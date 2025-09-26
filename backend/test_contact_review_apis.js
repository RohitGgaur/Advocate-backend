const axios = require('axios');

const BASE_URL = 'http://72.60.103.43:5173/api';

// Test Contact Form Submission
async function test_contact_form() {
    console.log('🧪 Testing Contact Form Submission...\n');
    
    try {
        const contact_data = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+91-9876543210',
            subject: 'Legal Consultation Inquiry',
            message: 'I need legal advice regarding property dispute. Please contact me at your earliest convenience.'
        };

        const response = await axios.post(`${BASE_URL}/contact/submit`, contact_data);
        
        console.log('✅ Contact Form Response:');
        console.log(JSON.stringify(response.data, null, 2));
        console.log('\n');
        
        return response.data.data.id;
    } catch (error) {
        console.error('❌ Contact Form Error:');
        console.error(error.response?.data || error.message);
        console.log('\n');
        return null;
    }
}

// Test Review Submission
async function test_review_form() {
    console.log('🧪 Testing Review Form Submission...\n');
    
    try {
        const review_data = {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            overall_rating: 5,
            category_ratings: {
                communication: 5,
                professionalism: 4,
                response: 5
            },
            feedback_text: 'Excellent legal services! The team was very professional and responsive. Highly recommended for anyone seeking legal assistance.',
            recommendation: 'yes'
        };

        const response = await axios.post(`${BASE_URL}/reviews/submit`, review_data);
        
        console.log('✅ Review Form Response:');
        console.log(JSON.stringify(response.data, null, 2));
        console.log('\n');
        
        return response.data.data.id;
    } catch (error) {
        console.error('❌ Review Form Error:');
        console.error(error.response?.data || error.message);
        console.log('\n');
        return null;
    }
}

// Test Get Reviews
async function test_get_reviews() {
    console.log('🧪 Testing Get Reviews...\n');
    
    try {
        const response = await axios.get(`${BASE_URL}/reviews/public`);
        
        console.log('✅ Get Reviews Response:');
        console.log(JSON.stringify(response.data, null, 2));
        console.log('\n');
    } catch (error) {
        console.error('❌ Get Reviews Error:');
        console.error(error.response?.data || error.message);
        console.log('\n');
    }
}

// Test Get Contacts (Admin)
async function test_get_contacts() {
    console.log('🧪 Testing Get Contacts (Admin)...\n');
    
    try {
        const response = await axios.get(`${BASE_URL}/contact/all`);
        
        console.log('✅ Get Contacts Response:');
        console.log(JSON.stringify(response.data, null, 2));
        console.log('\n');
    } catch (error) {
        console.error('❌ Get Contacts Error:');
        console.error(error.response?.data || error.message);
        console.log('\n');
    }
}

// Test Review Statistics
async function test_review_stats() {
    console.log('🧪 Testing Review Statistics...\n');
    
    try {
        const response = await axios.get(`${BASE_URL}/reviews/stats/overview`);
        
        console.log('✅ Review Statistics Response:');
        console.log(JSON.stringify(response.data, null, 2));
        console.log('\n');
    } catch (error) {
        console.error('❌ Review Statistics Error:');
        console.error(error.response?.data || error.message);
        console.log('\n');
    }
}

// Run all tests
async function run_all_tests() {
    console.log('🚀 Starting API Tests...\n');
    console.log('=' .repeat(50));
    
    // Test contact form
    const contact_id = await test_contact_form();
    
    // Test review form
    const review_id = await test_review_form();
    
    // Test get reviews
    await test_get_reviews();
    
    // Test get contacts
    await test_get_contacts();
    
    // Test review statistics
    await test_review_stats();
    
    console.log('=' .repeat(50));
    console.log('✅ All tests completed!');
    
    if (contact_id) {
        console.log(`📧 Contact ID: ${contact_id}`);
    }
    if (review_id) {
        console.log(`⭐ Review ID: ${review_id}`);
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    run_all_tests().catch(console.error);
}

module.exports = {
    test_contact_form,
    test_review_form,
    test_get_reviews,
    test_get_contacts,
    test_review_stats,
    run_all_tests
};
