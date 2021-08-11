import { Action, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface EventsState {
  value?: any;
}

const initialState: EventsState = {};

interface IAction extends Action {
  payload: {
    value: any;
  };
}

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    action: (state, action: IAction) => {
      const { value } = action.payload;
      state.value = value;
    },
  },
});

export const { action } = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;

export const valueSelector = (state: RootState) => state.events.value;
