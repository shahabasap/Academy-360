import React, { useEffect, useState } from 'react';
import AdminMainSidebar from '../../components/Admin/SideBar';
import AdminMainTopNav from '../../components/Admin/TopNav';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApiController from '../../Api/apiCalls';
import DashboardData from '../../types/dashboard'
import { Link, useNavigate } from 'react-router-dom';

const AdminDash: React.FC = () => {
  const [studentsCount, setStudentcount] = useState<number | undefined>(undefined);
  const [teachersCount, setTeachercount] = useState<number | undefined>(undefined);
  const [data, setData] = useState<DashboardData['CharData']>([]);
  const navigate=useNavigate()

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    const response = await ApiController.AdminDashboard();
    if (response) {
      setStudentcount(response.StudentsCount[0]?.count);
      setTeachercount(response.TeacherCount[0]?.count);
      setData(response.CharData);
    } else {
      // Handle the case where data fetching failed
    }
  }

  return (
    <div className='flex flex-row bg-[#191C24] min-h-screen'>
      <AdminMainSidebar />
      <div className='flex flex-col w-full'>
        <AdminMainTopNav />
        <div className='p-4'>
          {/* Main Contents here */}
          <div className="flex flex-row w-full gap-4">
            <div className="flex-1 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Classrooms</h5>
              </a>
              <p className="mb-2 text-2xl font-medium tracking-tight text-white">26</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800">
                 more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
            <div className="flex-1 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Students</h5>
              </a>
              <p className="mb-2 text-2xl font-medium tracking-tight text-white">{studentsCount}</p>
      
              <div  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800"
                onClick={()=>{navigate('/admin/students')}}>
                 more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </div>
            </div>
            <div className="flex-1 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Teachers</h5>
              </a>
              <p className="mb-2 text-2xl font-medium tracking-tight text-white">{teachersCount}</p>
              <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800"
              onClick={()=>{navigate('/admin/teachers')}}>
                 more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </div>
            </div>

            {/* Repeat similar divs for other cards if needed */}
          </div>

          {/* Chart Section */}
          <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow">
            <h5 className="mb-4 text-2xl font-bold tracking-tight text-white">Students and Teachers Joined in a Month</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTeachers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#555555" />
                <XAxis dataKey="name" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '10px' }} />
                <Legend wrapperStyle={{ color: '#ffffff' }} />
                <Bar dataKey="Students" fill="url(#colorStudents)" barSize={20} />
                <Bar dataKey="Teachers" fill="url(#colorTeachers)" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
