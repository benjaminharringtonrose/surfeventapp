import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser, IError } from "../../common";

interface AuthState {
  user?: AuthUser;
  loadingSignIn: boolean;
  errorSignIn?: IError;
  loadingSignUp: boolean;
  errorSignUp?: IError;
  loadingSignOut: boolean;
  errorSignOut?: IError;
}

const initialState: AuthState = {
  loadingSignIn: false,
  loadingSignUp: false,
  loadingSignOut: false,
};

export type SubscribeToAuthUserAction = PayloadAction<{ user?: AuthUser }>;

export type SignInRequestedAction = PayloadAction<{ email: string; password: string }>;
export type SignInSucceededAction = PayloadAction<{ user?: AuthUser }>;
export type SignInFailedAction = PayloadAction<{ error: IError }>;

export type SignUpRequestedAction = PayloadAction<{ email: string; password: string }>;
export type SignUpSucceededAction = PayloadAction<undefined>;
export type SignUpFailedAction = PayloadAction<{ error: IError }>;

export type SignOutRequestedAction = PayloadAction<undefined>;
export type SignOutSucceededAction = PayloadAction<undefined>;
export type SignOutFailedAction = PayloadAction<{ error: IError }>;

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
    signInFailed: (state, action: SignUpFailedAction) => {
      const { error } = action.payload;
      state.loadingSignIn = false;
      state.errorSignIn = error;
    },
    signUpRequested: (state, _: SignUpRequestedAction) => {
      state.loadingSignUp = true;
    },
    signUpSucceeded: (state, _: SignUpSucceededAction) => {
      state.loadingSignUp = false;
    },
    signUpFailed: (state, action: SignUpFailedAction) => {
      const { error } = action.payload;
      state.loadingSignUp = false;
      state.errorSignUp = error;
    },
    signOutRequested: (state, _: SignOutRequestedAction) => {
      state.loadingSignOut = true;
    },
    signOutSucceeded: (state, _: SignOutSucceededAction) => {
      state.loadingSignOut = false;
    },
    signOutFailed: (state, action: SignOutFailedAction) => {
      const { error } = action.payload;
      state.loadingSignOut = false;
      state.errorSignOut = error;
    },
  },
});

export const {
  setAuthUser,
  signInRequested,
  signInSucceeded,
  signUpFailed,
  signUpRequested,
  signUpSucceeded,
  signInFailed,
  signOutRequested,
  signOutSucceeded,
  signOutFailed,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
