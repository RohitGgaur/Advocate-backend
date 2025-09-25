const axios = require('axios');

const BASE_URL = 'http://72.60.103.43:5000';

// Test update API
async function testUpdateAPI() {
    try {
        console.log('🧪 Testing Update API...\n');

        // First, get all blogs to find a blog ID
        console.log('1. Fetching all blogs...');
        const blogsResponse = await axios.get(`${BASE_URL}/api/blogs`);
        console.log(`✅ Found ${blogsResponse.data.blogs.length} blogs`);

        if (blogsResponse.data.blogs.length === 0) {
            console.log('❌ No blogs found. Please create a blog first.');
            return;
        }

        // Use the first blog for testing
        const blogId = blogsResponse.data.blogs[0]._id;
        console.log(`📝 Testing with blog ID: ${blogId}`);

        // Test update
        console.log('\n2. Testing blog update...');
        const updateData = {
            title: 'Updated Title - ' + new Date().toISOString(),
            excerpt: 'This is an updated excerpt for testing purposes.',
            content: 'This is updated content to test if the update API is working properly.',
            status: 'published'
        };

        const updateResponse = await axios.put(`${BASE_URL}/api/blogs/${blogId}`, updateData);
        console.log('✅ Update successful!');
        console.log('📊 Response:', JSON.stringify(updateResponse.data, null, 2));

        // Verify the update by fetching the blog again
        console.log('\n3. Verifying update...');
        const verifyResponse = await axios.get(`${BASE_URL}/api/blogs/${blogId}`);
        console.log('✅ Verification successful!');
        console.log('📊 Updated blog:', JSON.stringify(verifyResponse.data.blog, null, 2));

        // Check if the changes are actually in the database
        console.log('\n4. Checking database persistence...');
        const allBlogsResponse = await axios.get(`${BASE_URL}/api/blogs`);
        const updatedBlog = allBlogsResponse.data.blogs.find(blog => blog._id === blogId);
        
        if (updatedBlog && updatedBlog.title === updateData.title) {
            console.log('✅ Database persistence confirmed! Changes are saved.');
        } else {
            console.log('❌ Database persistence failed! Changes not saved.');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Run the test
testUpdateAPI();
