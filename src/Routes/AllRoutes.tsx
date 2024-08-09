







const AllRoutes=()=>{


  {/* Public Routes */}
  <Route path="/" element={<Home />} />

  {/* Student Routes */}
  <Route path="/login" element={<StudentLoginPage />} />
  <Route path="/verify" element={<Otp />} />
  <Route path="/register" element={<SignUp />} />
  <Route path="/dashboard" element={<Summary />} />

  {/* Teacher Routes */}
  <Route path="/teacher" element={<TeacherLoginPage />} />
  <Route path="/teacher/verify" element={<TeacherOtp />} />
  <Route path="/teacher/register" element={<TeacherSignUp />} />
  <Route path="/teacher/dashboard" element={<TeacherSummary />} />

  {/* Admin Routes */}
  <Route path="/admin" element={<AdminLogin />} />
  <Route path="/admin/dashboard" element={<AdminDash />} />
  <Route path="/admin/students" element={<AdminStudent />} />
  <Route path="/admin/teachers" element={<AdminTeacher />} />



}


