# Postman API Tests for Reviews

## Base URL
```
http://72.60.103.43:5173/api
```

## 1. GET Reviews (Public) - For Home Page
**Method:** GET  
**URL:** `http://72.60.103.43:5173/api/reviews/public`  
**Headers:** None required  
**Body:** None  

**Query Parameters (Optional):**
- `limit`: Number of reviews to return (default: 10)
- `status`: Filter by status (`pending`, `approved`, `rejected`)
- `featured`: Filter featured reviews (`true`, `false`)

**Example with parameters:**
```
http://72.60.103.43:5173/api/reviews/public?limit=5&status=approved
```

## 2. GET All Reviews (Admin) - For Admin Panel
**Method:** GET  
**URL:** `http://72.60.103.43:5173/api/reviews/admin/all`  
**Headers:** 
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```
**Body:** None  

**Query Parameters (Optional):**
- `limit`: Number of reviews to return
- `page`: Page number for pagination
- `status`: Filter by status
- `featured`: Filter featured reviews
- `sortBy`: Sort field (`createdAt`, `overall_rating`)
- `sortOrder`: Sort order (`asc`, `desc`)

## 3. POST Review (Submit New Review)
**Method:** POST  
**URL:** `http://72.60.103.43:5173/api/reviews/submit`  
**Headers:** 
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "name": "Test User",
    "email": "test@example.com",
    "overall_rating": 5,
    "category_ratings": {
        "communication": 5,
        "professionalism": 4,
        "response": 5
    },
    "feedback_text": "Great service! Highly recommended.",
    "recommendation": "yes"
}
```

## 4. GET Single Review
**Method:** GET  
**URL:** `http://72.60.103.43:5173/api/reviews/{review_id}`  
**Headers:** None required  
**Body:** None  

## 5. UPDATE Review Status (Admin)
**Method:** PATCH  
**URL:** `http://72.60.103.43:5173/api/reviews/{review_id}/status`  
**Headers:** 
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "status": "approved"
}
```

## 6. UPDATE Review Featured Status (Admin)
**Method:** PATCH  
**URL:** `http://72.60.103.43:5173/api/reviews/{review_id}/featured`  
**Headers:** 
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "is_featured": true
}
```

## 7. DELETE Review (Admin)
**Method:** DELETE  
**URL:** `http://72.60.103.43:5173/api/reviews/{review_id}`  
**Headers:** 
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```
**Body:** None  

## 8. GET Review Statistics (Admin)
**Method:** GET  
**URL:** `http://72.60.103.43:5173/api/reviews/stats/overview`  
**Headers:** 
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```
**Body:** None  

## Expected Response Format

### Success Response:
```json
{
    "success": true,
    "message": "Reviews fetched successfully",
    "data": {
        "reviews": [
            {
                "_id": "review_id",
                "name": "John Doe",
                "email": "john@example.com",
                "overall_rating": 5,
                "category_ratings": {
                    "communication": 5,
                    "professionalism": 4,
                    "response": 5
                },
                "feedback_text": "Great service!",
                "recommendation": "yes",
                "status": "approved",
                "is_featured": false,
                "createdAt": "2025-09-19T10:30:00.000Z",
                "updatedAt": "2025-09-19T10:30:00.000Z"
            }
        ],
        "total": 1,
        "page": 1,
        "limit": 10
    }
}
```

### Error Response:
```json
{
    "success": false,
    "message": "Error message here",
    "error": "Detailed error information"
}
```

## Quick Test Steps:

1. **Start Backend Server:**
   ```bash
   cd d:\advocate\backend
   npm start
   ```

2. **Test GET Reviews:**
   - Open Postman
   - Create new GET request
   - URL: `http://72.60.103.43:5173/api/reviews/public`
   - Send request

3. **Test POST Review:**
   - Create new POST request
   - URL: `http://72.60.103.43:5173/api/reviews/submit`
   - Headers: `Content-Type: application/json`
   - Body: Use the JSON example above
   - Send request

4. **Check Response:**
   - Should return success: true
   - Should include the created review data
   - Should send email to gaur0423@gmail.com (if email is configured)

## Common Issues:

1. **Server not running:** Make sure backend is running on port 5000
2. **CORS errors:** Backend has CORS enabled, should work fine
3. **Email not sending:** Check .env file for EMAIL_USER and EMAIL_PASS
4. **Database connection:** Make sure MongoDB is running and connected

## Test Data for Quick Testing:

```json
{
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "overall_rating": 5,
    "category_ratings": {
        "communication": 5,
        "professionalism": 5,
        "response": 4
    },
    "feedback_text": "Excellent legal service! The team was very professional and helped me with my property case. Highly recommended.",
    "recommendation": "yes"
}
```
