import ProfileManagement from '../../../components/StudentAndTeacher/profile/Management';
import React from 'react';
import {StudentProfileFormData } from '../../../types/commonType';
import ApiControllers from '../../../Api/apiCalls'
import { useSelector } from 'react-redux';
import { userData } from '../../../features/user/userSlice';

const StudentProfileManagement: React.FC = () => {
  const user=useSelector(userData)
  const userId=user._id
  return <ProfileManagement  />;
};

export default StudentProfileManagement;
