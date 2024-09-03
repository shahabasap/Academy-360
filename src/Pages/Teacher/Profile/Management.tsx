import ProfileManagement from '../../../components/StudentAndTeacher/profile/Management';
import React from 'react';
import { TeacherProfileFormData } from '../../../types/commonType';
import ApiController from '../../../Api/apiCalls';
import { useSelector } from 'react-redux';
import { TeacherData } from '../../../features/teacher/teacherSlice';

// Helper function to convert a file to a Base64 string
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const TeacherProfileManagement: React.FC = () => {
  const teacher = useSelector(TeacherData);
  const userId = teacher._id;

 
  

  return <ProfileManagement  />;
};

export default TeacherProfileManagement;
