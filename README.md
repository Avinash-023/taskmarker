# Zenith Dashboard

A modern, full-stack dashboard application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 🔐 **Authentication** - User registration and login with JWT
- ✅ **Task Management** - Create, read, update, and delete tasks with status tracking
- 📝 **Notes** - Organize notes with tags and full-text search
- 👤 **User Profile** - Manage personal information and settings
- 📊 **Dashboard Overview** - View statistics and recent activity
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- shadcn/ui component library
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Express Validator for input validation

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

### 1. Clone the repository
```bash
git clone <YOUR_GIT_URL>
cd zenith-dashboard-main
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

#### Frontend (.env in root directory)
```bash
cp .env.example .env
```

Default configuration:
```
VITE_API_URL=http://localhost:5000/api
```

#### Backend (backend/.env)
```bash
cd backend
cp .env.example .env
```

Update with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zenith-dashboard
JWT_SECRET=your_secure_jwt_secret_here
CLIENT_URL=http://localhost:8080
NODE_ENV=development
```

### 5. Set Up MongoDB

**Option A: Local MongoDB**
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use default connection string in `.env`

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in `backend/.env`

## Running the Application

### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend will run on `http://localhost:8080`

### Option 2: Production Build

**Build Frontend:**
```bash
npm run build
```

**Start Backend:**
```bash
cd backend
npm start
```

## Project Structure

```
zenith-dashboard-main/
├── backend/                 # Backend API
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
│
├── src/                    # Frontend source
│   ├── components/        # React components
│   ├── context/          # React context (Auth)
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities and API client
│   ├── pages/            # Page components
│   └── types/            # TypeScript types
│
├── public/               # Static assets
├── .env                  # Frontend environment variables
└── package.json          # Frontend dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats/overview` - Get statistics

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
