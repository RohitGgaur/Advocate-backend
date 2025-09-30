// Test email configuration
require('dotenv').config();
const { send_email } = require('./config/nodemailer');

async function testEmail() {
    console.log('Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***SET***' : '***NOT SET***');
    
    if (!process.env.EMAIL_PASS) {
        console.error('❌ EMAIL_PASS is not set in .env file');
        console.error('Please follow the EMAIL_SETUP_GUIDE.md to set up Gmail App Password');
        return;
    }
    
    try {
        const result = await send_email('contact_form', {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            subject: 'Test Email',
            message: 'This is a test email to verify the configuration.'
        });
        
        if (result.success) {
            console.log('✅ Email sent successfully!');
            console.log('Message ID:', result.messageId);
        } else {
            console.error('❌ Failed to send email:', result.error);
        }
    } catch (error) {
        console.error('❌ Error testing email:', error.message);
    }
}

testEmail();

