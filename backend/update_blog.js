const axios = require('axios');

const BASE_URL = 'http://72.60.103.43:5000/api';

async function updateBlog() {
    console.log('🔄 Updating blog with proper content...\n');

    try {
        // First, get the existing blog
        const getResponse = await axios.get(`${BASE_URL}/blogs`);
        const blogId = getResponse.data.blogs[0]._id;
        
        console.log('Found blog ID:', blogId);

        // Update the blog with proper content
        const updateData = {
            title: "Understanding Legal Rights in Property Disputes",
            excerpt: "Learn about your legal rights and options when facing property disputes. Our experienced advocates guide you through the complex legal landscape.",
            content: `
                <h2>Understanding Legal Rights in Property Disputes</h2>
                
                <p>Property disputes can be complex and emotionally draining. Whether you're dealing with boundary issues, title disputes, or construction problems, understanding your legal rights is crucial for protecting your interests.</p>
                
                <h3>Common Types of Property Disputes</h3>
                <ul>
                    <li><strong>Boundary Disputes:</strong> Conflicts over property lines and encroachments</li>
                    <li><strong>Title Issues:</strong> Problems with property ownership documentation</li>
                    <li><strong>Construction Disputes:</strong> Issues with contractors, builders, or construction quality</li>
                    <li><strong>Easement Conflicts:</strong> Disputes over rights of way and access</li>
                    <li><strong>Landlord-Tenant Issues:</strong> Rental property disputes and eviction matters</li>
                </ul>
                
                <h3>Your Legal Rights</h3>
                <p>As a property owner, you have several legal rights that can help protect your interests:</p>
                
                <h4>Right to Quiet Enjoyment</h4>
                <p>You have the right to use and enjoy your property without interference from others, including neighbors or previous owners.</p>
                
                <h4>Right to Legal Representation</h4>
                <p>You have the right to legal counsel when facing property disputes. An experienced property lawyer can help you understand your options and represent your interests in court.</p>
                
                <h4>Right to Due Process</h4>
                <p>Any legal action against your property must follow proper legal procedures, giving you the opportunity to defend your rights.</p>
                
                <h3>Steps to Take When Facing a Property Dispute</h3>
                <ol>
                    <li><strong>Document Everything:</strong> Keep detailed records of all communications, agreements, and incidents</li>
                    <li><strong>Review Legal Documents:</strong> Examine deeds, contracts, and other relevant paperwork</li>
                    <li><strong>Seek Legal Advice:</strong> Consult with an experienced property lawyer</li>
                    <li><strong>Consider Mediation:</strong> Explore alternative dispute resolution methods</li>
                    <li><strong>Prepare for Litigation:</strong> If necessary, prepare for court proceedings</li>
                </ol>
                
                <h3>How We Can Help</h3>
                <p>At Judicioworks Advocates and Associates, our experienced property law team has successfully handled numerous property disputes. We provide:</p>
                <ul>
                    <li>Comprehensive legal analysis of your case</li>
                    <li>Strategic planning and representation</li>
                    <li>Negotiation and settlement services</li>
                    <li>Court representation when necessary</li>
                    <li>Ongoing support throughout the process</li>
                </ul>
                
                <p>Don't let property disputes overwhelm you. Contact our legal experts today for a consultation and let us help you protect your rights and interests.</p>
            `,
            category: "Property Law",
            tags: ["property", "legal rights", "disputes", "real estate"],
            status: "published"
        };

        const updateResponse = await axios.put(`${BASE_URL}/blogs/${blogId}`, updateData);
        console.log('✅ Blog Updated Successfully:');
        console.log(JSON.stringify(updateResponse.data, null, 2));

    } catch (error) {
        console.error('❌ Error updating blog:', error.response?.data || error.message);
    }
}

// Run the update
updateBlog();
