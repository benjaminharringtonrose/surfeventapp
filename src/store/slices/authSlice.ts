import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser, IError } from "../../common";

interface AuthState {
  user?: AuthUser;
  loadingSignIn: boolean;
  errorSignIn?: IError;
}

const initialState: AuthState = {
  loadingSignIn: false,
};

export type SubscribeToAuthUserAction = PayloadAction<{ user?: AuthUser }>;
export type SignInRequestedAction = PayloadAction<{ email: string; password: string }>;
export type SignInSucceededAction = PayloadAction<{ user?: AuthUser }>;
export type SignInFailedAction = PayloadAction<{ error: IError }>;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: SubscribeToAuthUserAction) => {
      const { user } = action.payload;
      state.user = user;
    },
    signInRequested: (state, _: SignInRequestedAction) => {
      state.loadingSignIn = true;
    },
    signInSucceeded: (state, action: SignInSucceededAction) => {
      const { user } = action.payload;
      state.user = user;
      state.loadingSignIn = false;
    },
    signInFailed: (state, action: SignInFailedAction) => {
      const { error } = action.payload;
      state.loadingSignIn = false;
      state.errorSignIn = error;
    },
  },
});

export const { setAuthUser, signInRequested, signInSucceeded, signInFailed } = authSlice.actions;
export const authReducer = authSlice.reducer;
