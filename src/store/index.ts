import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { eventsReducer } from "./slices/eventsSlice";
import { judgeReducer } from "./slices/judgeSlice";
import { userReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    events: eventsReducer,
    judge: judgeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
