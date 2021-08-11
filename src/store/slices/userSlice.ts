import { Action, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface UserState {
  value?: any;
}

const initialState: UserState = {};

interface IAction extends Action {
  payload: {
    value: any;
  };
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    action: (state, action: IAction) => {
      const { value } = action.payload;
      state.value = value;
    },
  },
});

export const { action } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const valueSelector = (state: RootState) => state.user.value;
