import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: any | null; // Define the type for user if you have a specific type
  login: boolean;
  role: string | null;
  UserClass: any | null; // Define the type for UserClass if you have a specific type
}

const storedUserInfo = localStorage.getItem('userInfo');
const storedUserClassroomInfo = localStorage.getItem('userClassroomInfo');
const initialState: UserState = {
  user: storedUserInfo ? JSON.parse(storedUserInfo) : null,
  UserClass: storedUserClassroomInfo ? JSON.parse(storedUserClassroomInfo) : null,
  login: !!storedUserInfo,
  role: 'student',
};

const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<any>) => { // Replace `any` with your user type
      state.user = action.payload;
      state.login = true;
      state.role = 'student';
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    userLogout: (state) => {
      state.user = null;
      state.login = false;
      state.role = null;
      state.UserClass = null; // Clear classroom info in state
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userClassroomInfo'); // Clear classroom info on logout
    },
    userClassLogin: (state, action: PayloadAction<any>) => { 
      state.UserClass = action.payload;
      localStorage.setItem('userClassroomInfo', JSON.stringify(action.payload));
    },
    userClassLogout: (state) => {
      state.UserClass = null;
      localStorage.removeItem('userClassroomInfo');
    },
  },
});

export const { userLogin, userLogout, userClassLogin, userClassLogout } = userSlice.actions;

export const selectUser = (state: { userInfo: UserState }) => state.userInfo.login;
export const role = (state: { userInfo: UserState }) => state.userInfo.role;
export const userData = (state: { userInfo: UserState }) => state.userInfo.user;
export const selectUserClass = (state: { userInfo: UserState }) => state.userInfo.UserClass;

export default userSlice.reducer;
