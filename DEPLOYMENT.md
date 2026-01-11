# Deployment Guide - Zenith Dashboard

## Pre-Deployment Checklist

### ✅ Before Pushing to GitHub

1. **Verify .gitignore is working:**
   ```powershell
   git status
   ```
   Make sure `.env` files and `node_modules` are NOT listed!

2. **Check for sensitive data:**
   - ❌ No `.env` files should be committed
   - ❌ No `node_modules` folders
   - ❌ No personal API keys or secrets
   - ✅ Only `.env.example` files should be committed

3. **Test locally first:**
   ```powershell
   # Backend
   cd backend
   npm run dev
   
   # Frontend (new terminal)
   npm run dev
   ```

## Push to GitHub

### Initial Setup

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Zenith Dashboard MERN Stack"

# Create GitHub repository and add remote
git remote add origin https://github.com/YOUR_USERNAME/zenith-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Update .env.example Files

Make sure these files exist with placeholder values:

**Root `.env.example`:**
```env
VITE_API_URL=http://localhost:5000/api
```

**`backend/.env.example`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zenith-dashboard
JWT_SECRET=your_jwt_secret_key_change_this_in_production
CLIENT_URL=http://localhost:8080
NODE_ENV=development
```

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add Environment Variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_strong_random_secret
   CLIENT_URL=https://your-frontend-url.vercel.app
   NODE_ENV=production
   ```
6. Add MongoDB Plugin or use MongoDB Atlas
7. Railway will auto-deploy from `backend/` folder
8. Copy your Railway backend URL

#### Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: `./` (root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
7. Deploy!

### Option 2: Heroku (Full Stack)

#### Deploy Backend

```powershell
# Login to Heroku
heroku login

# Create app
heroku create zenith-dashboard-backend

# Add MongoDB
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_strong_secret
heroku config:set CLIENT_URL=https://zenith-dashboard-frontend.herokuapp.com
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix backend heroku main
```

#### Deploy Frontend

```powershell
# Create frontend app
heroku create zenith-dashboard-frontend

# Set environment variable
heroku config:set VITE_API_URL=https://zenith-dashboard-backend.herokuapp.com/api

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Deploy
git push heroku main
```

### Option 3: Render (Both)

#### Deploy Backend

1. Go to [Render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - Name: `zenith-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add Environment Variables (from backend/.env.example)
6. Create MongoDB Atlas database and add connection string
7. Deploy

#### Deploy Frontend

1. New → Static Site
2. Connect same repository
3. Configure:
   - Name: `zenith-frontend`
   - Root Directory: `./`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add Environment Variable:
   ```
   VITE_API_URL=https://zenith-backend.onrender.com/api
   ```
5. Deploy

### Option 4: DigitalOcean App Platform

1. Go to [DigitalOcean Apps](https://cloud.digitalocean.com/apps)
2. Create App → GitHub → Select repository
3. Detect both frontend and backend automatically
4. Configure environment variables for both
5. Add MongoDB Managed Database
6. Deploy

## MongoDB Setup for Production

### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster (Free tier available)
3. Database Access → Add new user
4. Network Access → Add IP (0.0.0.0/0 for any IP)
5. Get connection string
6. Update `MONGODB_URI` in your deployment platform

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/zenith-dashboard?retryWrites=true&w=majority
```

## Post-Deployment

### 1. Test Your Deployed App

- ✅ Register a new user
- ✅ Login
- ✅ Create tasks
- ✅ Create notes
- ✅ Update profile
- ✅ Logout and login again

### 2. Update Backend CORS

Make sure `backend/.env` has correct CLIENT_URL:
```env
CLIENT_URL=https://your-frontend-domain.com
```

### 3. Security Checklist

- ✅ Strong JWT_SECRET (use random generator)
- ✅ Environment variables set correctly
- ✅ MongoDB network access configured
- ✅ HTTPS enabled (automatic on most platforms)
- ✅ No sensitive data in repository

## Environment Variables Reference

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=very_long_random_string_at_least_32_characters
CLIENT_URL=https://your-frontend-url.com
NODE_ENV=production
```

## Continuous Deployment

Once set up, any push to your main branch will automatically trigger redeployment:

```powershell
# Make changes
git add .
git commit -m "Update feature"
git push origin main
```

The platforms will automatically:
1. Pull latest code
2. Install dependencies
3. Build
4. Deploy

## Troubleshooting

### Build Fails
- Check Node version (use LTS)
- Verify all dependencies in package.json
- Check build logs for specific errors

### API Not Connecting
- Verify VITE_API_URL includes `/api`
- Check CORS settings in backend
- Verify CLIENT_URL in backend

### Database Connection Failed
- Check MongoDB connection string
- Verify network access in MongoDB Atlas
- Check database user credentials

### JWT Token Issues
- Ensure JWT_SECRET is the same value
- Check token expiration (7 days default)
- Clear browser localStorage if needed

## Custom Domain (Optional)

### Vercel
1. Project Settings → Domains
2. Add your domain
3. Update DNS records as shown

### Railway
1. Project Settings → Domains
2. Add custom domain
3. Update DNS CNAME

## Support

For issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB connections

**Your app is ready for production! 🚀**
