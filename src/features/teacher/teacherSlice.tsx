import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeacherState {
  teacher: any | null; // Define the type for teacher if you have a specific type
  login: boolean;
  role: string | null;
  TeacherClass: any | null; // Define the type for TeacherClass if you have a specific type
}

const storedteacherInfo = localStorage.getItem('teacherInfo');
const storedteacherClassroomInfo = localStorage.getItem('teacherClassroomInfo');
const initialState: TeacherState = {
  teacher: storedteacherInfo ? JSON.parse(storedteacherInfo) : null,
  TeacherClass: storedteacherClassroomInfo ? JSON.parse(storedteacherClassroomInfo) : null,
  login: !!storedteacherInfo,
  role: 'teacher',
};

const teacherSlice = createSlice({
  name: 'teacherAuth',
  initialState,
  reducers: {
    teacherLogin: (state, action: PayloadAction<any>) => { // Replace `any` with your teacher type
      state.teacher = action.payload;
      state.login = true;
      state.role = 'teacher';
      localStorage.setItem('teacherInfo', JSON.stringify(action.payload));
    },
    teacherLogout: (state) => {
      state.teacher = null;
      state.login = false;
      state.role = null;
      localStorage.removeItem('teacherInfo');
      localStorage.removeItem('teacherClassroomInfo'); // Clear classroom info on logout
      state.TeacherClass = null; // Clear classroom info in state
    },
    TeacherClassLogin: (state, action: PayloadAction<any>) => { // Replace `any` with your classroom type
      state.TeacherClass = action.payload;
      localStorage.setItem('teacherClassroomInfo', JSON.stringify(action.payload));
    },
    TeacherClassLogout: (state) => {
      state.TeacherClass = null;
      localStorage.removeItem('teacherClassroomInfo');
    },
  },
});

export const { teacherLogin, teacherLogout, TeacherClassLogin, TeacherClassLogout } = teacherSlice.actions;

export const selectTeacher = (state: { teacher: TeacherState }) => state.teacher.login;
export const role = (state: { teacher: TeacherState }) => state.teacher.role;
export const TeacherData = (state: { teacher: TeacherState }) => state.teacher.teacher;
export const selectTeacherClass = (state: { teacher: TeacherState }) => state.teacher.TeacherClass;

export default teacherSlice.reducer;
