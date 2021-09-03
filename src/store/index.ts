import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userListener } from "../middleware/userListener";
import { authReducer } from "./slices/authSlice";
import { eventsReducer } from "./slices/eventsSlice";
import { heatReducer } from "./slices/heatSlice";
import { userReducer } from "./slices/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  events: eventsReducer,
  heat: heatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [userListener, ...getDefaultMiddleware<RootState>()],
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
