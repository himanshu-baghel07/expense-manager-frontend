import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  username: "",
};

const userReducer = createSlice({
  name: "user_detail",
  initialState,
  reducers: {
    setFullname: (state, action) => {
      state.fullname = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setFullname, setUsername } = userReducer.actions;

export default userReducer.reducer;
