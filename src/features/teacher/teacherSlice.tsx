import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeacherState {
  teacher: any | null; // Define the type for teacher if you have a specific type
  login: boolean;
  role:string | null
}

const storedteacherInfo = localStorage.getItem('teacherInfo');
const initialState: TeacherState = {
  teacher: storedteacherInfo ? JSON.parse(storedteacherInfo) : null,
  login: !!storedteacherInfo,
  role:"teacher"
};

const teacherSlice = createSlice({
  name: 'teacherAuth',
  initialState,
  reducers: {
    teacherLogin: (state, action: PayloadAction<any>) => { // Replace `any` with your teacher type
      state.teacher = action.payload;
      state.login = true;
      state.role="teacher"
      localStorage.setItem('teacherInfo', JSON.stringify(action.payload));
    },
    teacherLogout: (state) => {
      state.teacher = null;
      state.login = false;
      state.role=null
      localStorage.removeItem('teacherInfo');
    },
  },
});

export const { teacherLogin, teacherLogout } = teacherSlice.actions;

export const selectTeacher = (state: { teacher: TeacherState }) => state.teacher.login;
export const  role = (state: { teacher: TeacherState }) => state.teacher.role;

export default teacherSlice.reducer;
