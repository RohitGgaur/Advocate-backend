const nodemailer = require('nodemailer');

// Create transporter configuration
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'gaur0423@gmail.com',
            pass: process.env.EMAIL_PASS || 'your_app_password_here' // You'll need to set this in .env
        }
    });
};

// Email templates
const email_templates = {
    contact_form: (data) => ({
        from: process.env.EMAIL_USER || 'gaur0423@gmail.com',
        to: 'gaur0423@gmail.com',
        subject: `New Contact Form Submission - ${data.subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
                    New Contact Form Submission
                </h2>
                
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    <p><strong>Subject:</strong> ${data.subject}</p>
                </div>
                
                <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <h3 style="color: #374151; margin-top: 0;">Message</h3>
                    <p style="line-height: 1.6; color: #4b5563;">${data.message}</p>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">
                        <strong>Submitted on:</strong> ${new Date().toLocaleString('en-IN', { 
                            timeZone: 'Asia/Kolkata',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
            </div>
        `
    }),
    
    review_submission: (data) => ({
        from: process.env.EMAIL_USER || 'gaur0423@gmail.com',
        to: 'gaur0423@gmail.com',
        subject: `New Review Submission - ${data.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
                    New Review Submission
                </h2>
                
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #374151; margin-top: 0;">Reviewer Details</h3>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                </div>
                
                <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #374151; margin-top: 0;">Ratings</h3>
                    <p><strong>Overall Rating:</strong> ${'⭐'.repeat(data.overall_rating)} (${data.overall_rating}/5)</p>
                    <p><strong>Communication:</strong> ${'⭐'.repeat(data.category_ratings.communication)} (${data.category_ratings.communication}/5)</p>
                    <p><strong>Professionalism:</strong> ${'⭐'.repeat(data.category_ratings.professionalism)} (${data.category_ratings.professionalism}/5)</p>
                    <p><strong>Response Time:</strong> ${'⭐'.repeat(data.category_ratings.response)} (${data.category_ratings.response}/5)</p>
                    <p><strong>Recommendation:</strong> ${data.recommendation === 'yes' ? '👍 Yes' : '👎 No'}</p>
                </div>
                
                ${data.feedback_text ? `
                <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <h3 style="color: #374151; margin-top: 0;">Feedback</h3>
                    <p style="line-height: 1.6; color: #4b5563;">${data.feedback_text}</p>
                </div>
                ` : ''}
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">
                        <strong>Submitted on:</strong> ${new Date().toLocaleString('en-IN', { 
                            timeZone: 'Asia/Kolkata',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
            </div>
        `
    })
};

// Send email function
const send_email = async (template_name, data) => {
    try {
        const transporter = createTransporter();
        const email_template = email_templates[template_name];
        
        if (!email_template) {
            throw new Error(`Email template '${template_name}' not found`);
        }
        
        const mail_options = email_template(data);
        const result = await transporter.sendMail(mail_options);
        
        console.log('Email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    createTransporter,
    send_email,
    email_templates
};
