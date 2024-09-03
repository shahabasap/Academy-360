// utils/typeGuards.ts
import { TeacherProfileFormData, StudentProfileFormData } from '../types/commonType';

export const isStudent = (values: TeacherProfileFormData | StudentProfileFormData): values is StudentProfileFormData => {
  return (values as StudentProfileFormData).graduation !== undefined;
};

export const isTeacher = (values: TeacherProfileFormData | StudentProfileFormData): values is TeacherProfileFormData => {
  return (values as TeacherProfileFormData).experiences !== undefined;
};
