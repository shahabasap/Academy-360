// // AllRoutes.tsx
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import TeacherLoginPage from "../Pages/Teacher/Login";
import FogotpasswordTeacher from "../Pages/Teacher/forgotpassword";
import ResetpasswordTeacher from "../Pages/Teacher/resetpassword";
import TeacherSummary from "../Pages/Teacher/summary";
import TeacherOtp from "../Pages/Teacher/otp";
import TeacherSignUp from "../Pages/Teacher/Signup";
import AdminLogin from "../Pages/Admin/login";
import AdminDash from "../Pages/Admin/dashboard";
import AdminStudent from "../Pages/Admin/student";
import AdminTeacher from "../Pages/Admin/teachers";
import Home from "../components/Home";
import TeacherProtectRoutes from "./ProtectRoutes/TeacherProtectRoutes";
import AdminProtectRoute from "./ProtectRoutes/AdminProtectRoute";
import AdminIsAuth from "./IsAuth/AdminIsAuth";
import TeacherIsAuth from "./IsAuth/TeacherIsAuth";
import RoleProvider from "../context/RoleContext";
import StudentLoginPage from "../Pages/Student/Login";
import Otp from "../Pages/Student/otp";
import Summary from "../Pages/Student/Summary";
import Fogotpassword from "../Pages/Student/forgotPassword";
import Resetpassword from "../Pages/Student/resetPassword";
import SignUp from "../Pages/Student/Signup";
import StudentIsAuth from "./IsAuth/StudentIsAuth";
import StudentProtectRoute from "./ProtectRoutes/StudentProtectRoute";

import Navbar from "../components/StudentAndTeacher/MainTopNav";
import TeacherProfileOverview from "../Pages/Teacher/Profile/overview";
import ProfileTeacherClassrooms from "../Pages/Teacher/Profile/classroom";
import TeacherProfile from "../Pages/Teacher/Profile/Management";
import TeacherClassrooms from "../Pages/Teacher/Classroom/Classrooms";



function StudentRoute() {
  return (
    <Routes>
      <Route path="/" element={<RoleProvider role="Student" />}>
      <Route path="/" element={<Home />} />
     
      {/* Student Routes */}
        <Route element={<StudentIsAuth />}>
          <Route path="login" element={<StudentLoginPage />} />
          <Route path="verify" element={<Otp />} />
          <Route path="register" element={<SignUp />} />
          <Route path="forgotpassword" element={<Fogotpassword />} />
          <Route path="resetpassword/:token" element={<Resetpassword />} />
        </Route>
        <Route element={<StudentProtectRoute />}>\
        <Route element={<Navbar/>}>
          <Route path="dashboard" element={<Summary />} />
          <Route path="classroom" element={<TeacherClassrooms />} />
          <Route path="profile" element={<TeacherProfileOverview />} />
          <Route path="profile/management" element={<TeacherProfile/>} />
          <Route path="profile/classroom" element={<ProfileTeacherClassrooms />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default StudentRoute;
