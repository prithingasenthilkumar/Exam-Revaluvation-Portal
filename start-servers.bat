@echo off
echo 🚀 Starting Exam Re-evaluation Portal...
echo ========================================
echo.

echo 📦 Installing backend dependencies...
cd backend
if not exist node_modules (
    npm install
)

echo 🔧 Building backend...
npm run build

echo 🖥️  Starting backend server...
start "Backend Server" cmd /k "npm run dev"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo 📦 Installing frontend dependencies...
cd ..\frontend
if not exist node_modules (
    npm install
)

echo 🌐 Starting frontend server...
start "Frontend Server" cmd /k "npm start"

echo.
echo ✅ Both servers are starting...
echo 🔗 Backend:  http://localhost:3001
echo 🌐 Frontend: http://localhost:3000
echo.
echo Demo Credentials:
echo Email: student@university.edu
echo Password: password123
echo Role: Student
echo.
pause