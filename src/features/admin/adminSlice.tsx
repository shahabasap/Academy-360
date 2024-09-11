import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdminState {
  admin: any | null; // Define the type for admin if you have a specific type
  isAdmin: boolean;
  role: string | null;
}

// Helper function to check if a string is valid JSON
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

// Fetching stored admin data from localStorage
const storedAdminInfo = getStoredValue('adminInfo');

const initialState: AdminState = {
  admin: storedAdminInfo,
  isAdmin: !!storedAdminInfo,
  role: storedAdminInfo ? 'admin' : null,  // Set role to 'admin' only if there's admin info
};

const adminSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLogin: (state, action: PayloadAction<any>) => {
      state.admin = action.payload;
      state.isAdmin = true;
      state.role = 'admin';
      try {
        localStorage.setItem('adminInfo', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Failed to store admin info:', error);
      }
    },
    adminLogout: (state) => {
      state.admin = null;
      state.isAdmin = false;
      state.role = null;
      localStorage.removeItem('adminInfo');
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;

// Selectors
export const selectAdmin = (state: { admin: AdminState }) => state.admin.isAdmin;
export const role = (state: { admin: AdminState }) => state.admin.role;
export const AdminData = (state: { admin: AdminState }) => state.admin.admin || null;

export default adminSlice.reducer;
