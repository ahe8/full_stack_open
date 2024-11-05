import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", token: "", username: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action) {
      state = action.payload;
      return action.payload;
    },
    clearUserState: () => initialState,
  },
});

export const { setUserState, clearUserState } = userSlice.actions;

export const setUserAuthInfo = (user) => {
  return async (dispatch) => {
    dispatch(setUserState(user));
  };
};

export const removeUserAuthInfo = () => {
  return async (dispatch) => {
    dispatch(clearUserState());
  };
};

export default userSlice.reducer;
