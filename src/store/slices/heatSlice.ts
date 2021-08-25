import { Action, createSlice } from "@reduxjs/toolkit";

interface ITimer {
  hrs: number;
  mins: number;
  secs: number;
}

interface IInitTimer {
  initHrs: number;
  initMins: number;
  initSecs: number;
}

interface HeatState {
  timer: ITimer;
  initialTime: IInitTimer;
  isRunning: boolean;
}

const initialState: HeatState = {
  timer: {
    hrs: 0,
    mins: 0,
    secs: 0,
  },
  initialTime: {
    initHrs: 0,
    initMins: 0,
    initSecs: 0,
  },
  isRunning: false,
};

interface ISetTime extends Action {
  payload: {
    timer: ITimer;
  };
}

interface IInitialSetTime extends Action {
  payload: {
    initialTime: IInitTimer;
  };
}

interface ISetIsRunning extends Action {
  payload: {
    isRunning: boolean;
  };
}

export const heatSlice = createSlice({
  name: "heat",
  initialState,
  reducers: {
    setTime: (state, action: ISetTime) => {
      const { timer } = action.payload;
      state.timer = timer;
    },
    setInitialTime: (state, action: IInitialSetTime) => {
      const { initialTime } = action.payload;
      state.initialTime = initialTime;
    },
    setIsRunning: (state, action: ISetIsRunning) => {
      const { isRunning } = action.payload;
      state.isRunning = isRunning;
    },
  },
});

export const { setTime, setInitialTime, setIsRunning } = heatSlice.actions;
export const heatReducer = heatSlice.reducer;
