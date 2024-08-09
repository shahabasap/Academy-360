// AllRoutes.tsx
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RoleProvider from '../context/RoleContext';
import StudentLoginPage from '../Pages/Student/Login';
import TeacherLoginPage from '../Pages/Teacher/Login';
import Otp from '../Pages/Student/otp';
import Summary from '../Pages/Student/Summary';
import TeacherSummary from '../Pages/Teacher/summary';
import SignUp from '../Pages/Student/Signup';
import TeacherOtp from '../Pages/Teacher/otp';
import TeacherSignUp from '../Pages/Teacher/Signup';
import AdminLogin from '../Pages/Admin/login';
import AdminDash from '../Pages/Admin/dashboard';
import AdminStudent from '../Pages/Admin/student';
import AdminTeacher from '../Pages/teacher';
import Home from '../components/Home';
import TeacherProtectRoutes from './ProtectRoutes/TeacherProtectRoutes'
import StudentProtectRoute  from './ProtectRoutes/StudentProtectRoute'
import AdminProtectRoute  from  './ProtectRoutes/AdminProtectRoute'
import TeacherIsAuth from './IsAuth/TeacherIsAuth'
import StudentIsAuth from './IsAuth/StudentIsAuth'
import AdminIsAuth from './IsAuth/AdminIsAuth'


const AllRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      {/* Student Routes */}
      <Route path="/" element={<RoleProvider role="Student" />}>
      <Route element={<StudentIsAuth />}>
        <Route path="login" element={<StudentLoginPage />} />
        <Route path="verify" element={<Otp />} />
        <Route path="register" element={<SignUp />} />
      </Route>

        <Route element={<StudentProtectRoute />}>
          <Route path="dashboard" element={<Summary />} />
        </Route>

      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher" element={<RoleProvider role="Teacher" />}>
      <Route element={<TeacherIsAuth />}>
        <Route path="" element={<TeacherLoginPage />} />
        <Route path="verify" element={<TeacherOtp />} />
        <Route path="register" element={<TeacherSignUp />} />
        </Route>
        <Route element={<TeacherProtectRoutes  />}>
          <Route path="dashboard" element={<TeacherSummary />} />
        </Route>

      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<RoleProvider role="Admin" />}>
      <Route element={<AdminIsAuth />}>
        <Route path="" element={<AdminLogin />} />
        </Route>
        <Route element={<AdminProtectRoute  />}>
          <Route path="dashboard" element={<AdminDash />} />
          <Route path="students" element={<AdminStudent />} />
          <Route path="teachers" element={<AdminTeacher />} />
        </Route>

      </Route>
    </>
  )
);

export default AllRoutes;
