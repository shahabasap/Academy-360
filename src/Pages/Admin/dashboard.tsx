import React from 'react';
import AdminMainSidebar from '../../components/Admin/SideBar';
import AdminMainTopNav from '../../components/Admin/TopNav';

const AdminDash = () => {
  return (
    <div className='flex flex-row bg-[#191C24] min-h-screen'>
      <AdminMainSidebar />
      <div className='flex flex-col w-full'>
        <AdminMainTopNav  />
        <div>
          {/* Main Contents here */}
          Dashaboard
        </div>
      </div>
    </div>
  );
};

export default AdminDash;