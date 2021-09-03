import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IError, User } from "../../common";

interface UserState {
  user?: User;
  loadingUser?: boolean;
  errorGetUser?: IError;
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
    updateUser: (state, action: ISetUser) => {
      const { user } = action.payload;
      state.user = user;
    },
    loadingGetCurrentUser(state) {
      state.loadingUser = true;
      state.errorGetUser = undefined;
    },
    errorGetCurrentUser(state, action: PayloadAction<{ error: IError }>) {
      state.loadingUser = false;
      state.errorGetUser = action.payload.error;
    },
  },
});

export const { updateUser, loadingGetCurrentUser, errorGetCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const userSelector = (state: RootState) => state.user.user;
