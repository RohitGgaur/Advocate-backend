# Judicioworks Advocates and Associates

A complete web application for a law firm with frontend and backend separation.

## 📁 Project Structure

```
advocate/
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Public assets
│   ├── package.json  # Frontend dependencies
│   └── vite.config.js
├── backend/          # Express.js backend API
│   ├── server.js     # Main server file
│   └── package.json  # Backend dependencies
└── README.md
```

## 🚀 Quick Start

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

### Backend Setup
```bash
cd backend
npm install
npm start
```
Backend will run on: http://localhost:5000

## 🔗 API Endpoints

### Public Routes
- `GET /` - Server info
- `GET /api/health` - Health check
- `GET /api/blogs` - Get all blogs
- `GET /api/users` - Get all users

### Protected Routes
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/users` - Create user
- `GET /api/stats` - Get statistics

## 🛠️ Technologies Used

### Frontend
- React 18
- React Router DOM
- Vite
- Tailwind CSS

### Backend
- Express.js
- CORS
- JSON parsing

## 📱 Features

- Responsive design
- Admin panel
- Blog management
- User management
- Contact forms
- Team profiles
- Practice areas

## 🔧 Development

1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Access frontend: http://localhost:5173
4. Access backend: http://localhost:5000
