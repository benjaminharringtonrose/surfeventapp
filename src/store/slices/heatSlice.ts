import { Action, createSlice } from "@reduxjs/toolkit";

interface ITimer {
  hrs: number;
  mins: number;
  secs: number;
}

interface HeatState {
  timer: ITimer;
}

const initialState: HeatState = {
  timer: {
    hrs: 0,
    mins: 0,
    secs: 0,
  },
};

interface ISetTime extends Action {
  payload: {
    timer: ITimer;
  };
}

export const heatSlice = createSlice({
  name: "heat",
  initialState,
  reducers: {
    setTime: (state, action: ISetTime) => {
      const { timer } = action.payload;
      console.log(timer);
      state.timer = timer;
    },
  },
});

export const { setTime } = heatSlice.actions;
export const heatReducer = heatSlice.reducer;
