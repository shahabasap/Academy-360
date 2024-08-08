import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminDash from './components/Admin/AdminDash';
import AdminLogin from './components/Admin/AdminLogin';
import Home from './components/Home';
import Login from './components/Student/Login';
import Otp from './components/Student/Otp';
import SignUp from './components/Student/Signup';
import Summary from './components/Student/Summary';
import TeacherLogin from './components/Teacher/Login';
import TeacherOtp from './components/Teacher/Otp';
import TeacherSignUp from './components/Teacher/Signup';
import TeacherSummary from './components/Teacher/TeacherSummary';
import { selectAdmin } from './features/admin/adminSlice';
import { selectTeacher } from './features/teacher/teacherSlice';
import { selectUser } from './features/user/userSlice';
import './index.css';
import AdminStudent from './components/Admin/AdminStudents';
import AdminTeacher from './components/Admin/AdminTeacher';

function App() {
  const isAdminLoggedIn = useSelector(selectAdmin);
  const isTeacherLoggedIn = useSelector(selectTeacher);
  const isUserLoggedIn = useSelector(selectUser);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Student Routes */}
        <Route path="/login" element={isUserLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/verify" element={isUserLoggedIn ? <Navigate to="/dashboard" /> : <Otp />} />
        <Route path="/register" element={isUserLoggedIn ? <Navigate to="/dashboard" /> : <SignUp />} />
        <Route path="/dashboard" element={isUserLoggedIn ? <Summary /> : <Navigate to="/login" />} />

        {/* Teacher Routes */}
        <Route path="/teacher" element={isTeacherLoggedIn ? <Navigate to="/teacher/dashboard" /> : <TeacherLogin />} />
        <Route path="/teacher/verify" element={isTeacherLoggedIn ? <Navigate to="/teacher/dashboard" /> : <TeacherOtp />} />
        <Route path="/teacher/register" element={isTeacherLoggedIn ? <Navigate to="/teacher/dashboard" /> : <TeacherSignUp />} />
        <Route path="/teacher/dashboard" element={isTeacherLoggedIn ? <TeacherSummary /> : <Navigate to="/teacher" />} />

        {/* Admin Routes */}
        <Route path="/admin" element={isAdminLoggedIn ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
        <Route path="/admin/dashboard" element={isAdminLoggedIn ? <AdminDash /> : <Navigate to="/admin" />} />
        <Route path="/admin/students" element={isAdminLoggedIn ? <AdminStudent /> : <Navigate to="/admin" />} />
        <Route path="/admin/teachers" element={isAdminLoggedIn ? <AdminTeacher /> : <Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
