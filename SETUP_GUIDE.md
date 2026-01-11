# Quick Start Guide - Zenith Dashboard MERN Stack

## Step-by-Step Setup Instructions

### 1. Install Backend Dependencies

Open a PowerShell terminal and run:

```powershell
cd "c:\Users\ELCOT\Downloads\zenith-dashboard-main\backend"
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- express-validator
- nodemon (dev dependency)

### 2. Start MongoDB

**If using local MongoDB:**
```powershell
# Start MongoDB service (if installed as service)
net start MongoDB
```

**If using MongoDB Atlas:**
- Update `backend/.env` with your MongoDB Atlas connection string

### 3. Start the Backend Server

```powershell
cd "c:\Users\ELCOT\Downloads\zenith-dashboard-main\backend"
npm run dev
```

The backend will run on `http://localhost:5000`

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
```

### 4. Start the Frontend (in a new terminal)

```powershell
cd "c:\Users\ELCOT\Downloads\zenith-dashboard-main"
npm run dev
```

The frontend will run on `http://localhost:8080`

### 5. Access the Application

Open your browser and navigate to: `http://localhost:8080`

## Testing the API

You can test the backend API directly:

### Register a New User
```powershell
$body = @{
    fullName = "Test User"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

### Login
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
$token = $response.token
```

### Create a Task
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$taskBody = @{
    title = "My First Task"
    description = "Testing the API"
    status = "todo"
    priority = "high"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/tasks" -Method POST -Headers $headers -Body $taskBody
```

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your connection string in `backend/.env`
- For Atlas, ensure your IP is whitelisted

### Port Already in Use
If port 5000 or 8080 is in use:
- Change PORT in `backend/.env`
- Change port in `vite.config.ts` for frontend

### CORS Errors
- Ensure `CLIENT_URL` in `backend/.env` matches your frontend URL
- Default is `http://localhost:8080`

## Next Steps

1. Register a new user account at `http://localhost:8080/register`
2. Login with your credentials
3. Create tasks, notes, and update your profile
4. All data is stored in MongoDB

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Deploy to platforms like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS

### Frontend
1. Update `VITE_API_URL` to your backend URL
2. Run `npm run build`
3. Deploy the `dist` folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront

### Database
- MongoDB Atlas for production database
- Enable authentication
- Set up backup schedules
