// // AllRoutes.tsx
import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import RoleProvider from "../context/RoleContext";
import StudentLoginPage from "../Pages/Student/Login";
import Otp from "../Pages/Student/otp";
import Fogotpassword from "../Pages/Student/forgotPassword";
import Resetpassword from "../Pages/Student/resetPassword";
import SignUp from "../Pages/Student/Signup";
import StudentIsAuth from "./IsAuth/StudentIsAuth";
import StudentProtectRoute from "./ProtectRoutes/StudentProtectRoute";
import Navbar from "../components/StudentAndTeacher/Others/MainTopNav";
import TeacherProfileOverview from "../Pages/Teacher/Profile/overview";
import ProfileTeacherClassrooms from "../Pages/Teacher/Profile/classroom";
import TeacherProfile from "../Pages/Teacher/Profile/Management";
import TeacherClassrooms from "../Pages/Teacher/Classroom/Classrooms";
import LandingPage from "../Pages/LandingPage";
import StudentSummaryPage from "../Pages/Student/Dashboard/summary";
import NotAtutherized from "../components/ErrorPages/403";
import StudentProfileManagement from "../Pages/Student/Profile/management";
import UnlockClassroom from '../components/student/unlockClassroom'
import NotFound from "../components/ErrorPages/404";
import ProtectStudentClassroom from "./ProtectRoutes/ProtectStudentClassroom";





function 
StudentRoute() {
  return (
    <Routes>
      <Route path="/" >
      <Route element={<Navbar/>}>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/notAuthorized" element={<NotAtutherized />} />
      </Route>
      <Route path="/" element={<RoleProvider role="Student" /> }>
    
      {/* Student Routes */}
        <Route element={<StudentIsAuth />}>
          <Route path="login" element={<StudentLoginPage />} />
          <Route path="verify" element={<Otp />} />
          <Route path="register" element={<SignUp />} />
          <Route path="forgotpassword" element={<Fogotpassword />} />
          <Route path="resetpassword/:token" element={<Resetpassword />} />
        </Route>
        <Route element={<StudentProtectRoute />}>
        <Route element={<Navbar/>}>
          <Route path="unlock-classroom" element={<UnlockClassroom />} />
          <Route path="classroom" element={<TeacherClassrooms />} />
          <Route path="profile" element={<TeacherProfileOverview />} />
          <Route path="profile/management" element={<StudentProfileManagement/>} />
          <Route path="profile/classroom" element={<ProfileTeacherClassrooms />} />
          <Route element={<ProtectStudentClassroom/>}>
          <Route path="dashboard" element={<StudentSummaryPage />} />
          </Route>
          </Route>
          </Route>
          </Route>
        </Route>
      
    </Routes>
  );
}

export default StudentRoute;