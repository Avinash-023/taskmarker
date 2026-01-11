@echo off
echo ============================================
echo Starting Zenith Dashboard Backend Server
echo ============================================
echo.

cd backend

echo Installing dependencies if needed...
call npm install

echo.
echo Starting backend server on http://localhost:5000
echo.
echo Make sure MongoDB is running!
echo.

call npm run dev
