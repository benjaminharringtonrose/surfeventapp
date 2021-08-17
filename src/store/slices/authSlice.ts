import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Action, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user?: FirebaseAuthTypes.User | null;
}

const initialState: AuthState = {};

interface ISubscribeToAuthUser extends Action {
  payload: {
    user: FirebaseAuthTypes.User;
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
