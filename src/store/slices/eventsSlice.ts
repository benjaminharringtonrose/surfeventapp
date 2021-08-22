import { Action, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface EventsState {
  eventId?: string;
}

const initialState: EventsState = {};

interface ISetEventId extends Action {
  payload: {
    eventId: string;
  };
}

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventId: (state, action: ISetEventId) => {
      const { eventId } = action.payload;
      state.eventId = eventId;
    },
  },
});

export const { setEventId } = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;

export const eventIdSelector = (state: RootState) => state.events.eventId;
