import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeacherState {
  teacher: any | null;
  login: boolean;
  role: string | null;
  TeacherClass: any | null;
}

const isValidJSON = (str: string | null): boolean => {
  if (str === null) return false;
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const getStoredValue = (key: string): any => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return null;
    if (!isValidJSON(storedValue)) return null;
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return null;
  }
};


const storedteacherInfo = getStoredValue('teacherInfo');
const storedteacherClassroomInfo = getStoredValue('teacherClassroomInfo');

const initialState: TeacherState = {
  teacher: storedteacherInfo,
  TeacherClass: storedteacherClassroomInfo,
  login: !!storedteacherInfo,
  role: 'teacher',
};

const teacherSlice = createSlice({
  name: 'teacherAuth',
  initialState,
  reducers: {
    teacherLogin: (state, action: PayloadAction<any>) => {
      state.teacher = action.payload;
      state.login = true;
      state.role = 'teacher';
      try {
        localStorage.setItem('teacherInfo', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Failed to store teacher info:', error);
      }
    },
    teacherLogout: (state) => {
      state.teacher = null;
      state.login = false;
      state.role = null;
      localStorage.removeItem('teacherInfo');
      localStorage.removeItem('teacherClassroomInfo');
      state.TeacherClass = null;
    },
    TeacherClassLogin: (state, action: PayloadAction<any>) => {
      state.TeacherClass = action.payload;
      try {
        localStorage.setItem('teacherClassroomInfo', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Failed to store teacher classroom info:', error);
      }
    },
    TeacherClassLogout: (state) => {
      state.TeacherClass = null;
      localStorage.removeItem('teacherClassroomInfo');
    },
  },
});

export const { 
  teacherLogin, 
  teacherLogout, 
  TeacherClassLogin, 
  TeacherClassLogout 
} = teacherSlice.actions;

export const selectTeacher = (state: { teacher: TeacherState }) => state.teacher.login;
export const role = (state: { teacher: TeacherState }) => state.teacher.role;
export const TeacherData = (state: { teacher: TeacherState }) => state.teacher.teacher || null;
export const selectTeacherClass = (state: { teacher: TeacherState }) => state.teacher.TeacherClass || null;

export default teacherSlice.reducer;
