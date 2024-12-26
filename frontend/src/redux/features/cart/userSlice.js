import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Save user data
    },
    clearUser: (state) => {
      state.user = null; // Clear user data on logout
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user?.user || null; // Selector
export default userSlice.reducer;
