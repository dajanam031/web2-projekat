import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    token: localStorage.getItem('token') || null,
    role: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, role } = action.payload;
      state.user = {
        token,
        role,
      };
      localStorage.setItem('token', token); 
    },
    clearUser: (state) => {
      state.user = {
        token: null,
        role: null,
      };
      localStorage.removeItem('token'); 
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

