import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { userListener } from "../middleware/userListener";
import authSaga from "./sagas/authSagas";
import { authReducer } from "./slices/authSlice";
import { eventsReducer } from "./slices/eventsSlice";
import { heatReducer } from "./slices/heatSlice";
import { settingsReducer } from "./slices/settingsSlice";
import { userReducer } from "./slices/userSlice";

function* rootSaga() {
  yield fork(authSaga);
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  events: eventsReducer,
  heat: heatReducer,
  settings: settingsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [userListener, sagaMiddleware, ...getDefaultMiddleware<RootState>()],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
