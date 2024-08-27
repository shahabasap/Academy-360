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
