import { Action, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface AuthState {
  value?: any;
}

const initialState: AuthState = {};

interface IAction extends Action {
  payload: {
    value: any;
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    action: (state, action: IAction) => {
      const { value } = action.payload;
      state.value = value;
    },
  },
});

export const { action } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const valueSelector = (state: RootState) => state.auth.value;
