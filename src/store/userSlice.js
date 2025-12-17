import { createSlice } from "@reduxjs/toolkit";
import { LogOut } from "lucide-react";

const initialState = {
  username: "",
  password: "",
  role: ""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions) => ({ ...actions.payload }),
    logout: () => initialState,
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;