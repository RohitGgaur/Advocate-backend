const API_BASE_URL = 'http://72.60.103.43:5173/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }


  // Get auth token from localStorage
  getToken() {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        return admin.token || admin._id; // Use token if available, otherwise use _id
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // Set auth token
  setToken(token) {
    // We don't need this since we store adminData
    console.log('setToken called with:', token);
  }

  // Remove auth token
  removeToken() {
    localStorage.removeItem('adminData');
  }

  // Make HTTP request
  async request(endpoint, options = {}) {
    // Add cache-busting parameter for GET requests
    let url = `${this.baseURL}${endpoint}`;
    if (options.method === 'GET' || !options.method) {
      const separator = endpoint.includes('?') ? '&' : '?';
      url += `${separator}_t=${Date.now()}&_r=${Math.random()}`;
    }
    
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    console.log('🚀 API Request:', { 
      url, 
      method: options.method || 'GET',
      headers: config.headers,
      body: options.body ? JSON.parse(options.body) : undefined 
    });

    try {
      const response = await fetch(url, config);
      
      console.log('📡 API Response Status:', response.status, response.statusText);
      
      // Check if response is JSON
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('📊 API Response Data:', data);
      } else {
        data = await response.text();
        console.log('📄 Non-JSON response:', data);
      }

      if (!response.ok) {
        console.error('❌ API Error Response:', { status: response.status, data });
        throw new Error(data.message || data || 'Something went wrong');
      }

      console.log('✅ API Request successful');
      return data;
    } catch (error) {
      console.error('❌ API Error:', error);
      if (error.message.includes('Failed to fetch')) {
        console.error('❌ Backend server might not be running on localhost:5000');
        throw new Error('Backend server is not running. Please start the backend server.');
      }
      throw error;
    }
  }

  // Auth API
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    console.log('API: Getting profile from backend...');
    
    // Use the known admin ID directly from the API
    const adminId = '68c563623a278f13e1975998';
    console.log('API: Using direct admin ID for profile fetch:', adminId);
    
    const response = await this.request(`/admin/${adminId}`);
    console.log('API: Profile response received:', response);
    
    // Store the response in localStorage for future use
    if (response.success && response.admin) {
      localStorage.setItem('adminData', JSON.stringify(response.admin));
      console.log('API: Stored admin data in localStorage for future use');
    }
    
    return response;
  }

  async updateProfile(profileData) {
    console.log('API: Updating profile with data:', profileData);
    
    // Use the known admin ID directly
    const adminId = '68c563623a278f13e1975998';
    console.log('API: Using direct admin ID for update:', adminId);
    
    const response = await this.request(`/admin/${adminId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    console.log('API: Profile update response received:', response);
    
    // Update localStorage with the updated data
    if (response.success && response.admin) {
      localStorage.setItem('adminData', JSON.stringify(response.admin));
      console.log('API: Updated localStorage with new admin data');
    }
    
    return response;
  }

  // Blog API
  async getBlogs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    
    try {
      const result = await this.request(`/blogs${queryString ? `?${queryString}` : ''}`);
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getBlog(id) {
    return this.request(`/blogs/${id}`);
  }

  async createBlog(blogData) {
    return this.request('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  }

  async updateBlog(id, blogData) {
    return this.request(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  }

  async deleteBlog(id) {
    return this.request(`/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  async getBlogStats() {
    try {
      return await this.request('/admin/stats');
    } catch (error) {
      console.log('Backend not available, using mock stats');
      // Return mock stats if backend is not available
      return {
        totalBlogs: 0,
        publishedBlogs: 0,
        draftBlogs: 0,
        totalViews: 0
      };
    }
  }

  // Admin Management API
  async getAdminStats() {
    return this.request('/admin/stats');
  }

  async getAdmins(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/list${queryString ? `?${queryString}` : ''}`);
  }

  async updateAdminStatus(id, isActive) {
    return this.request(`/admin/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isActive }),
    });
  }

  async updateAdminRole(id, role) {
    return this.request(`/admin/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async deleteAdmin(id) {
    return this.request(`/admin/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact Form API
  async submitContactForm(contactData) {
    console.log('API: Submitting contact form with data:', contactData);
    try {
      const result = await this.request('/contact/submit', {
        method: 'POST',
        body: JSON.stringify(contactData),
      });
      console.log('API: Contact form submission result:', result);
      return result;
    } catch (error) {
      console.error('API: Contact form submission error:', error);
      throw error;
    }
  }

  async getContacts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/contact/all${queryString ? `?${queryString}` : ''}`);
  }

  async getContact(id) {
    return this.request(`/contact/${id}`);
  }

  async updateContactStatus(id, status) {
    return this.request(`/contact/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteContact(id) {
    return this.request(`/contact/${id}`, {
      method: 'DELETE',
    });
  }

  // Review API
  async submitReview(reviewData) {
    console.log('API: Submitting review with data:', reviewData);
    try {
      const result = await this.request('/reviews/submit', {
        method: 'POST',
        body: JSON.stringify(reviewData),
      });
      console.log('API: Review submission result:', result);
      return result;
    } catch (error) {
      console.error('API: Review submission error:', error);
      throw error;
    }
  }

  async getReviews(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reviews/public${queryString ? `?${queryString}` : ''}`);
  }

  async getAllReviews(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reviews/admin/all${queryString ? `?${queryString}` : ''}`);
  }

  async getReview(id) {
    return this.request(`/reviews/${id}`);
  }

  async updateReviewStatus(id, status) {
    return this.request(`/reviews/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async updateReviewFeatured(id, isFeatured) {
    return this.request(`/reviews/${id}/featured`, {
      method: 'PATCH',
      body: JSON.stringify({ is_featured: isFeatured }),
    });
  }

  async deleteReview(id) {
    return this.request(`/reviews/${id}`, {
      method: 'DELETE',
    });
  }

  async getReviewStats() {
    return this.request('/reviews/stats/overview');
  }
}

export default new ApiService();
