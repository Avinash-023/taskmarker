# Zenith Dashboard Backend

Backend API for the Zenith Dashboard application built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zenith-dashboard
JWT_SECRET=your_secure_jwt_secret_here
CLIENT_URL=http://localhost:8080
NODE_ENV=development
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Tasks
- `GET /api/tasks` - Get all tasks (requires auth)
- `GET /api/tasks/:id` - Get single task (requires auth)
- `POST /api/tasks` - Create new task (requires auth)
- `PUT /api/tasks/:id` - Update task (requires auth)
- `DELETE /api/tasks/:id` - Delete task (requires auth)
- `GET /api/tasks/stats/overview` - Get task statistics (requires auth)

### Notes
- `GET /api/notes` - Get all notes (requires auth)
- `GET /api/notes/:id` - Get single note (requires auth)
- `POST /api/notes` - Create new note (requires auth)
- `PUT /api/notes/:id` - Update note (requires auth)
- `DELETE /api/notes/:id` - Delete note (requires auth)

### Profile
- `GET /api/profile` - Get user profile (requires auth)
- `PUT /api/profile` - Update user profile (requires auth)

## MongoDB Setup

### Local MongoDB
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/zenith-dashboard`

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in `.env`

## Project Structure

```
backend/
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── models/
│   ├── User.js          # User model
│   ├── Task.js          # Task model
│   └── Note.js          # Note model
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── tasks.js         # Task management routes
│   ├── notes.js         # Note management routes
│   └── profile.js       # Profile management routes
├── .env                 # Environment variables
├── .env.example         # Example environment file
├── server.js            # Express server setup
└── package.json         # Dependencies
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected routes require valid JWT token
- CORS configured for specified client URL
