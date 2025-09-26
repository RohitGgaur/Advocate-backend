const axios = require('axios');

const BASE_URL = 'http://72.60.103.43:5173/api';

async function testBlogAPI() {
    console.log('🧪 Testing Blog API...\n');

    try {
        // Test 1: GET All Blogs
        console.log('1️⃣ Testing GET /blogs...');
        const getResponse = await axios.get(`${BASE_URL}/blogs`);
        console.log('✅ GET Blogs Response:');
        console.log(JSON.stringify(getResponse.data, null, 2));
        console.log('\n' + '='.repeat(50) + '\n');

        // Test 2: GET Published Blogs
        console.log('2️⃣ Testing GET /blogs?status=published...');
        const publishedResponse = await axios.get(`${BASE_URL}/blogs?status=published`);
        console.log('✅ GET Published Blogs Response:');
        console.log(JSON.stringify(publishedResponse.data, null, 2));
        console.log('\n' + '='.repeat(50) + '\n');

        // Test 3: POST New Blog (if no blogs exist)
        if (!getResponse.data.blogs || getResponse.data.blogs.length === 0) {
            console.log('3️⃣ No blogs found, creating a test blog...');
            const blogData = {
                title: "Test Blog Post",
                content: "This is a test blog post content. It contains detailed information about legal services and practices.",
                excerpt: "This is a test blog post excerpt that will be shown on the blog listing page.",
                category: "General",
                tags: ["test", "legal", "blog"],
                status: "published"
            };

            const postResponse = await axios.post(`${BASE_URL}/blogs`, blogData);
            console.log('✅ POST Blog Response:');
            console.log(JSON.stringify(postResponse.data, null, 2));
            console.log('\n' + '='.repeat(50) + '\n');
        }

    } catch (error) {
        console.error('❌ Error testing blog API:', error.response?.data || error.message);
    }
}

// Run the test
testBlogAPI();
