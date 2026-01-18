import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import ReevaluationForm from './pages/ReevaluationForm';
import MyRequests from './pages/MyRequests';
import ExaminerQueue from './pages/ExaminerQueue';
import CompletedRequests from './pages/CompletedRequests';
import AdminDashboard from './pages/AdminDashboard';
import RequestReviewDetail from './pages/RequestReviewDetail';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/new-request" element={<ReevaluationForm />} />
            <Route path="/student/my-requests" element={<MyRequests />} />
            <Route path="/examiner/queue" element={<ExaminerQueue />} />
            <Route path="/examiner/completed" element={<CompletedRequests />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/examiner/review/:id" element={<RequestReviewDetail />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;