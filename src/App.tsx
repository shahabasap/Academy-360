
import "./index.css";
import { Route , Routes } from "react-router-dom";
import AdminRoute from "./Routes/AdminRoute";
import TeacherRoute from "./Routes/TeacherRoute";
import StudentRoute from "./Routes/Students"

function App() {
  return (
    <Routes>
        
      <Route path="/*" element={<StudentRoute />} />
      <Route path="/admin/*" element={<AdminRoute />} />
      <Route path="/teacher/*" element={<TeacherRoute />} />
      {/* <RouterProvider router={router} /> */}
    </Routes>
  );
}

export default App;
