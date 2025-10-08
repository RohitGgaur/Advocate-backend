// Test contact form submission API
const axios = require('axios');

async function testContactSubmission() {
    console.log('Testing contact form submission...');
    
    const contactData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        subject: 'Test Contact Form',
        message: 'This is a test message from the contact form.'
    };
    
    try {
        const response = await axios.post('http://localhost:5000/api/contact/submit', contactData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Contact form submitted successfully!');
        console.log('Response:', response.data);
        
    } catch (error) {
        console.error('❌ Error submitting contact form:', error.response?.data || error.message);
    }
}

testContactSubmission();
