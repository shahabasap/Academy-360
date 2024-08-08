import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdminState {
  admin: any | null; // Define the type for admin if you have a specific type
  isAdmin: boolean;
}

const storedAdminInfo = localStorage.getItem('adminInfo');
const initialState: AdminState = {
  admin: storedAdminInfo ? JSON.parse(storedAdminInfo) : null,
  isAdmin: !!storedAdminInfo,
};

const adminSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLogin: (state, action: PayloadAction<any>) => { // Replace `any` with your admin type
      state.admin = action.payload;
      state.isAdmin = true;
      localStorage.setItem('adminInfo', JSON.stringify(action.payload));
    },
    adminLogout: (state) => {
      state.admin = null;
      state.isAdmin = false;
      localStorage.removeItem('adminInfo');
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;

export const selectAdmin = (state: { admin: AdminState }) => state.admin.isAdmin;

export default adminSlice.reducer;
