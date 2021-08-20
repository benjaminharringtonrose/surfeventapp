import { Action, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../../common";

interface AuthState {
  user?: AuthUser;
}

const initialState: AuthState = {};

interface ISubscribeToAuthUser extends Action {
  payload: {
    user?: AuthUser;
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: ISubscribeToAuthUser) => {
      const { user } = action.payload;
      state.user = user;
    },
  },
});

export const { setAuthUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
