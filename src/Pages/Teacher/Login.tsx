import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { teacherLogin } from "../../features/teacher/teacherSlice";
import { toast } from "react-toastify";
import Login from "../../components/StudentAndTeacher/Login"

// Teacher Login Page
const TeacherLoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleTeacherLogin = async (values: { username: string; password: string }) => {
      try {
        const response = await axios.post('/api/auth/teacher/login', values);
        dispatch(teacherLogin(response.data));
        toast.success("Teacher logged in successfully!");
        navigate('/teacher/dashboard');
      } catch (error) {
        toast.error("Login failed. Please try again.");
        console.error(error);
      }
    };
  
    return <Login role="Teacher" onSubmit={handleTeacherLogin} signupUrl="/teacher/register" />;
  };

export default  TeacherLoginPage