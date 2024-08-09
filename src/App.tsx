import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import './index.css';
import StudentLoginPage from './Pages/Student/Login';
import TeacherLoginPage from './Pages/Teacher/Login';
import Otp from './Pages/Student/otp';
import Summary from './Pages/Student/Summary';
import TeacherSummary from './Pages/Teacher/summary';
import SignUp from './Pages/Student/Signup';
import TeacherOtp from './Pages/Teacher/otp';
import TeacherSignUp from './Pages/Teacher/Signup';
import AdminLogin from './Pages/Admin/login';
import AdminDash from './Pages/Admin/dashboard';
import AdminStudent from './Pages/Admin/student';
import AdminTeacher from './Pages/Admin/teacher';
import { useSelector } from 'react-redux';
import { selectUser } from './features/user/userSlice';



function App() {
  const user=useSelector(selectUser)

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Student Routes */}
        <Route path="/login" element={<StudentLoginPage />} />
        <Route path="/verify" element={<Otp />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Summary />} />

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLoginPage />} />
        <Route path="/teacher/verify" element={<TeacherOtp />} />
        <Route path="/teacher/register" element={<TeacherSignUp />} />
        <Route path="/teacher/dashboard" element={<TeacherSummary />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDash />} />
        <Route path="/admin/students" element={<AdminStudent />} />
        <Route path="/admin/teachers" element={<AdminTeacher />} />
      </Routes>
    </Router>
  );
}

export default App;
