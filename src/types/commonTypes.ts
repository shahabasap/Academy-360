export interface IClassroom {
    subject: string;
    classroomid:string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    teacherid ? :mongoose.Types.ObjectId;
    students ?:StudentData[];
    examsid ?:mongoose.Types.ObjectId[];
    materialsid ?:mongoose.Types.ObjectId[];
    worksid ?:mongoose.Types.ObjectId[];
    announcementsid ?:mongoose.Types.ObjectId[];
  
  }
  mongoo

  export type StudentData={
    studentid:mongoose.Types.ObjectId;
    IsAdded:boolean
  }