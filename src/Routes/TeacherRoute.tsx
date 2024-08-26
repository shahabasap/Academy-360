import RoleProvider from "../context/RoleContext";
import { Route, Routes } from "react-router-dom";
import TeacherIsAuth from "./IsAuth/TeacherIsAuth";
import TeacherLoginPage from "../Pages/Teacher/Login";
import TeacherOtpPage from "../Pages/Teacher/otp";
import TeacherSignUpPage from "../Pages/Teacher/Signup";
import ResetpasswordTeacher from "../Pages/Teacher/resetpassword";
import TeacherProtectRoutes from "./ProtectRoutes/TeacherProtectRoutes";
import Summary from "../Pages/Teacher/Dashboard/summary";
import ForgotPasswordPage from "../Pages/Teacher/forgotpassword";
import TeacherProfile from "../Pages/Teacher/Profile/Management";
import Navbar from "../components/StudentAndTeacher/Others/MainTopNav";
import TeacherProfileOverview from "../Pages/Teacher/Profile/overview";
import TeacherClassrooms from "../Pages/Teacher/Classroom/Classrooms";
import ProfileTeacherClassrooms from "../Pages/Teacher/Profile/classroom";
import StudentSummaryPage from "../Pages/Student/Dashboard/summary";


function TeacherRoute() {
  return (
    <Routes>
      <Route path="/" element={<RoleProvider role="Teacher" />}>
        <Route element={<TeacherIsAuth />}>
          <Route path="" element={<TeacherLoginPage />} />
          <Route path="verify" element={<TeacherOtpPage />} />
          <Route path="register" element={<TeacherSignUpPage />} />
          <Route path="forgotpassword" element={<ForgotPasswordPage />} />
          <Route
            path="resetpassword/:token"
            element={<ResetpasswordTeacher />}
          />
        </Route>
        <Route element={<TeacherProtectRoutes />}>
        <Route element={<Navbar/>}>
          <Route path="dashboard" element={<StudentSummaryPage />} />
          <Route path="classroom" element={<TeacherClassrooms />} />
          <Route path="profile" element={<TeacherProfileOverview />} />
          <Route path="profile/management" element={<TeacherProfile />} />
          <Route path="profile/classroom" element={<ProfileTeacherClassrooms />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default TeacherRoute;
