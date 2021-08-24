import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { eventsReducer } from "./slices/eventsSlice";
import { heatReducer } from "./slices/heatSlice";
import { userReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    events: eventsReducer,
    heat: heatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
