# Contact & Review API Documentation

## Overview
This document describes the API endpoints for contact form submissions and review/feedback management.

## Base URL
```
http://72.60.103.43:5173/api
```

## Contact Form APIs

### 1. Submit Contact Form
**POST** `/contact/submit`

Submit a new contact form message.

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+91-9876543210",
    "subject": "Legal Consultation Inquiry",
    "message": "I need legal advice regarding property dispute."
}
```

**Response:**
```json
{
    "success": true,
    "message": "Contact form submitted successfully",
    "data": {
        "id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "subject": "Legal Consultation Inquiry",
        "status": "new",
        "created_at": "2023-09-05T10:30:00.000Z"
    }
}
```

### 2. Get All Contacts (Admin)
**GET** `/contact/all`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (new, read, replied, closed)
- `search` (optional): Search in name, email, or subject

**Response:**
```json
{
    "success": true,
    "data": {
        "contacts": [...],
        "pagination": {
            "current_page": 1,
            "total_pages": 5,
            "total_contacts": 50,
            "has_next": true,
            "has_prev": false
        }
    }
}
```

### 3. Get Single Contact
**GET** `/contact/:id`

**Response:**
```json
{
    "success": true,
    "data": {
        "id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+91-9876543210",
        "subject": "Legal Consultation Inquiry",
        "message": "I need legal advice...",
        "status": "new",
        "created_at": "2023-09-05T10:30:00.000Z",
        "updated_at": "2023-09-05T10:30:00.000Z"
    }
}
```

### 4. Update Contact Status
**PATCH** `/contact/:id/status`

**Request Body:**
```json
{
    "status": "read"
}
```

### 5. Delete Contact
**DELETE** `/contact/:id`

## Review APIs

### 1. Submit Review
**POST** `/reviews/submit`

Submit a new review/feedback.

**Request Body:**
```json
{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "overall_rating": 5,
    "category_ratings": {
        "communication": 5,
        "professionalism": 4,
        "response": 5
    },
    "feedback_text": "Excellent legal services!",
    "recommendation": "yes"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Review submitted successfully",
    "data": {
        "id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "name": "Jane Smith",
        "overall_rating": 5,
        "recommendation": "yes",
        "status": "pending",
        "created_at": "2023-09-05T10:30:00.000Z"
    }
}
```

### 2. Get Public Reviews
**GET** `/reviews/public`

Get approved reviews for public display.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `featured_only` (optional): Show only featured reviews (true/false)

**Response:**
```json
{
    "success": true,
    "data": {
        "reviews": [
            {
                "id": "64f8a1b2c3d4e5f6a7b8c9d1",
                "name": "Jane Smith",
                "overall_rating": 5,
                "category_ratings": {
                    "communication": 5,
                    "professionalism": 4,
                    "response": 5
                },
                "feedback_text": "Excellent legal services!",
                "recommendation": "yes",
                "is_featured": true,
                "created_at": "2023-09-05T10:30:00.000Z"
            }
        ],
        "pagination": {
            "current_page": 1,
            "total_pages": 3,
            "total_reviews": 25,
            "has_next": true,
            "has_prev": false
        }
    }
}
```

### 3. Get All Reviews (Admin)
**GET** `/reviews/admin/all`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (pending, approved, rejected)
- `search` (optional): Search in name, email, or feedback_text

### 4. Get Single Review
**GET** `/reviews/:id`

### 5. Update Review Status (Admin)
**PATCH** `/reviews/:id/status`

**Request Body:**
```json
{
    "status": "approved"
}
```

### 6. Toggle Featured Status (Admin)
**PATCH** `/reviews/:id/featured`

**Request Body:**
```json
{
    "is_featured": true
}
```

### 7. Delete Review (Admin)
**DELETE** `/reviews/:id`

### 8. Get Review Statistics
**GET** `/reviews/stats/overview`

**Response:**
```json
{
    "success": true,
    "data": {
        "total_reviews": 100,
        "approved_reviews": 85,
        "pending_reviews": 10,
        "featured_reviews": 15,
        "average_ratings": {
            "avg_overall": 4.2,
            "avg_communication": 4.3,
            "avg_professionalism": 4.1,
            "avg_response": 4.0
        },
        "recommendation_breakdown": [
            {
                "_id": "yes",
                "count": 80
            },
            {
                "_id": "no",
                "count": 5
            }
        ]
    }
}
```

## Email Notifications

Both contact form submissions and review submissions automatically send email notifications to `gaur0423@gmail.com` with:

- **Contact Form**: Name, email, phone, subject, and message
- **Review Form**: Name, email, ratings, feedback, and recommendation

## Environment Variables Required

Create a `.env` file in the backend directory:

```env
# Email Configuration
EMAIL_USER=gaur0423@gmail.com
EMAIL_PASS=your_gmail_app_password_here

# Other existing variables...
```

## Testing

Run the test file to verify all APIs:

```bash
node test_contact_review_apis.js
```

## Error Responses

All endpoints return consistent error responses:

```json
{
    "success": false,
    "message": "Error description",
    "error": "Detailed error message (in development)"
}
```

## Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error
