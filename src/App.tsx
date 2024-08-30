import "./index.css";
import { Route, Routes } from "react-router-dom";
import AdminRoute from "./Routes/AdminRoute";
import TeacherRoute from "./Routes/TeacherRoute";
import StudentRoute from "./Routes/Students";


function App() {
  return (
    <Routes>
      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminRoute />} />

      {/* Teacher routes */}
      <Route path="/teacher/*" element={<TeacherRoute />} />

      {/* Student routes */}
      <Route path="/*" element={<StudentRoute />} />

      {/* Fallback for undefined routes */}
      
    </Routes>
  );
}

export default App;
