export default interface DashboardData {
    StudentsCount: {
      _id: {
        month: number;
        year: number;
      };
      count: number;
    }[];
    TeacherCount: {
      _id: {
        month: number;
        year: number;
      };
      count: number;
    }[];
    CharData: {
      name: string;
      Students: number;
      Teachers: number;
    }[];
  }
  