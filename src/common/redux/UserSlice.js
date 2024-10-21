import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const userReducer = createSlice({
  name: "user_detail",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = userReducer.actions;

export default userReducer.reducer;
