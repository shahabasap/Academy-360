import RoleProvider from "../context/RoleContext";
import { Route, Routes } from "react-router-dom";
import AdminIsAuth from "./IsAuth/AdminIsAuth";
import AdminProtectRoute from "./ProtectRoutes/AdminProtectRoute";
import AdminDash from "../Pages/Admin/dashboard";
import AdminLoginPage from "../Pages/Admin/login";
import StudentManagement from "../Pages/Admin/student";
import TeacherManagement from "../Pages/Admin/teachers";
import ClassroomManagement from "../Pages/Admin/classroom";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="" element={<AdminIsAuth />}>
        <Route path="/" element={<AdminLoginPage />} />
      </Route>
      <Route path="/" element={<RoleProvider role="Admin" />} />
      <Route path="" element={<AdminProtectRoute />}>
        <Route path="dashboard" element={<AdminDash />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="teachers" element={<TeacherManagement />} />
        <Route path="classrooms" element={<ClassroomManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
