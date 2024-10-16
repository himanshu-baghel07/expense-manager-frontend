import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
};

const userReducer = createSlice({
  name: "user_detail",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshToken } = userReducer.actions;

export default userReducer.reducer;
