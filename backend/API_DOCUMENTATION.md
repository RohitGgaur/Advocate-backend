# Advocate Backend API Documentation

## Overview
This is the backend API for the Advocate website with blog management and admin authentication features.

## Environment Variables Required
Create a `.env` file in the backend directory with the following variables:

```
URI=mongodb://localhost:27017/advocate_db
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
Register a new admin user
- **Body**: `{ username, email, password, role? }`
- **Response**: `{ success, message, token, admin }`

#### POST `/api/auth/login`
Login admin user
- **Body**: `{ email, password }`
- **Response**: `{ success, message, token, admin }`

#### GET `/api/auth/me`
Get current admin profile (Protected)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success, admin }`

#### PUT `/api/auth/profile`
Update admin profile (Protected)
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ username?, email? }`
- **Response**: `{ success, message, admin }`

#### PUT `/api/auth/change-password`
Change admin password (Protected)
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ current_password, new_password }`
- **Response**: `{ success, message }`

### Blog Routes (`/api/blogs`)

#### GET `/api/blogs`
Get all blogs with pagination
- **Query Params**: `status?, page?, limit?`
- **Response**: `{ success, blogs, pagination }`

#### GET `/api/blogs/:id`
Get single blog by ID
- **Response**: `{ success, blog }`

#### POST `/api/blogs`
Create new blog (Protected)
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title, excerpt, content, image, status? }`
- **Response**: `{ success, message, blog }`

#### PUT `/api/blogs/:id`
Update blog (Protected)
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title?, excerpt?, content?, image?, status? }`
- **Response**: `{ success, message, blog }`

#### DELETE `/api/blogs/:id`
Delete blog (Protected)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success, message }`

#### GET `/api/blogs/stats/overview`
Get blog statistics (Protected)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success, stats }`

### Admin Management Routes (`/api/admin`)

#### GET `/api/admin/stats`
Get admin statistics (Super Admin only)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success, stats }`

#### GET `/api/admin/list`
Get all admins (Super Admin only)
- **Headers**: `Authorization: Bearer <token>`
- **Query Params**: `page?, limit?, role?, is_active?`
- **Response**: `{ success, admins, pagination }`

#### PUT `/api/admin/:id/status`
Update admin status (Super Admin only)
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ isActive }`
- **Response**: `{ success, message, admin }`

#### PUT `/api/admin/:id/role`
Update admin role (Super Admin only)
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ role }`
- **Response**: `{ success, message, admin }`

#### DELETE `/api/admin/:id`
Delete admin (Super Admin only)
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success, message }`

## Database Schemas

### Blog Schema
```javascript
{
  title: String (required),
  excerpt: String (required),
  content: String (required),
  image: String (required),
  status: String (enum: ['draft', 'published'], default: 'draft'),
  views: Number (default: 0),
  author: ObjectId (ref: 'Admin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Schema
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['admin', 'super_admin'], default: 'admin'),
  is_active: Boolean (default: true),
  last_login: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required environment variables

3. Start the server:
```bash
npm start
# or for development
npm run dev
```

## Features

- ✅ MongoDB integration with Mongoose
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Blog CRUD operations
- ✅ Admin management
- ✅ Role-based access control
- ✅ Pagination support
- ✅ Error handling
- ✅ Input validation
- ✅ CORS enabled
