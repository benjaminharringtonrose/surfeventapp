import { Action, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { User } from "../../common";

interface UserState {
  user?: User;
}

const initialState: UserState = {};

interface ISetUser extends Action {
  payload: {
    user: User;
  };
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRequest: (state, action: ISetUser) => {
      const { user } = action.payload;
      state.user = user;
    },
  },
});

export const { setUserRequest } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const userSelector = (state: RootState) => state.user.user;
