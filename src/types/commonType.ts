import mongoose from "mongoose";
export interface ClassroomData {
  subject: string;
  description: string;
  teacherid?: string; // Make it optional in case it's not always present
  classroomid?: string;
}

export interface IClassroom {
  _id: string;
  subject: string;
  classroomid: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  teacherid?: mongoose.Types.ObjectId;
  students?: StudentData[];
  examsid?: mongoose.Types.ObjectId[];
  materialsid?: mongoose.Types.ObjectId[];
  worksid?: mongoose.Types.ObjectId[];
  announcementsid?: mongoose.Types.ObjectId[];
}
export interface JoinClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (classroomId: string) => void;
}
export type StudentData = {
  studentid: mongoose.Types.ObjectId;
  IsAdded: boolean;
};

export interface TableProps {
  headers: string[];
  data: any[];
  currentPage: number;
  itemsPerPage: number;
}

export interface Teacher {
  _id: string;
  username: string;
  name: string;
  Is_block: boolean;
  JoinedDate: string;
}

export type Experience = {
  institute: string;
  yearFrom: string;
  yearTo: string;
};

export type Graduation = {
  college: string;
  course: string;
  yearFrom: string;
  yearTo: string;
};

export type TeacherProfileFormData = {
  name: string;
  gender: string;
  phone: string;
  experiences: Experience[];
  graduation: Graduation;
  postGraduation: Graduation;
  ugCertificate: File | null;
  pgCertificate: File | null;
  photo: File | null;
};

export type StudentProfileFormData = {
  name: string;
  gender: string;
  phone: string;
  photo: File | null;
};

export interface TecherProfileManagementProps {
  onSubmit: (values: TeacherProfileFormData) => void;
}
export interface StudentProfileManagementProps {
  onSubmit: (values: StudentProfileFormData) => void;
}
