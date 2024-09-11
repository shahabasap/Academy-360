import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import Login from "../../components/StudentAndTeacher/Others/Login"

// Student Login Page
const StudentLoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleStudentLogin = async (values: { username: string; password: string }) => {
      try {
        const response = await axios.post('/api/auth/login', values);
        dispatch(userLogin(response.data));
        localStorage.setItem('role','student'); 

        toast.success("Student logged in successfully!");
        navigate('/classroom');

      } catch (error:any) {
       
        toast.error(`${error.response.data.error}`)
      }
    };
  
    return <Login  onSubmit={handleStudentLogin} signupUrl="/register" forgotpassURL="/forgotpassword" />;
  };
  

  export default  StudentLoginPage

  