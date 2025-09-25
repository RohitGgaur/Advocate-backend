const axios = require('axios');

async function testLargePayload() {
  try {
    console.log('🧪 Testing large payload...');
    
    // Test 1: Small payload (should work)
    console.log('\n📝 Test 1: Small payload');
    const smallPayload = {
      title: 'Test Blog',
      excerpt: 'Test excerpt',
      content: 'Test content',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A',
      status: 'draft'
    };
    
    const response1 = await axios.post('http://localhost:5000/api/blogs', smallPayload);
    console.log('✅ Small payload success:', response1.status);
    
    // Test 2: Large payload (base64 image)
    console.log('\n📝 Test 2: Large payload');
    const largeImage = 'data:image/jpeg;base64,' + 'A'.repeat(1000000); // ~1MB base64
    const largePayload = {
      title: 'Large Test Blog',
      excerpt: 'Large test excerpt',
      content: 'Large test content',
      image: largeImage,
      status: 'draft'
    };
    
    const response2 = await axios.post('http://localhost:5000/api/blogs', largePayload);
    console.log('✅ Large payload success:', response2.status);
    
  } catch (error) {
    console.log('❌ Error:', error.response?.status, error.response?.data);
  }
}

testLargePayload();

