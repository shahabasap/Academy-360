import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: any | null; // Define the type for user if you have a specific type
  login: boolean;
}

const storedUserInfo = localStorage.getItem('userInfo');
const initialState: UserState = {
  user: storedUserInfo ? JSON.parse(storedUserInfo) : null,
  login: !!storedUserInfo,
};

const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<any>) => { // Replace `any` with your user type
      state.user = action.payload;
      state.login = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    userLogout: (state) => {
      state.user = null;
      state.login = false;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;

export const selectUser = (state: { userInfo: UserState }) => state.userInfo.login;


export default userSlice.reducer;

