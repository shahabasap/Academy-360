import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { teacherLogin } from "../../features/teacher/teacherSlice";
import { toast } from "react-toastify";
import Login from "../../components/StudentAndTeacher/Others/Login"

// Teacher Login Page
const TeacherLoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleTeacherLogin = async (values: { username: string; password: string }) => {
      try {
        const response = await axios.post('/api/auth/teacher/login', values);
        dispatch(teacherLogin(response.data));
        toast.success("Teacher logged in successfully!");
        navigate('/teacher/classroom');
      } catch (error:any) {
        
        toast.error(`${error.response.data.error}`)

      }
    };
  
    return <Login  onSubmit={handleTeacherLogin} signupUrl="/teacher/register" forgotpassURL="/teacher/forgotpassword" />;
  };

export default  TeacherLoginPage