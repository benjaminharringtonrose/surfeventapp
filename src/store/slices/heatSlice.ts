import { Action, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { HeatData } from "../../screens/HeatSheetScreen";

interface HeatState {
  heatData: HeatData[];
}

const initialState: HeatState = {
  heatData: [],
};

interface IInitializeHeat extends Action {
  payload: {
    heatData: HeatData[];
  };
}

interface IUpdateHeat extends Action {
  payload: {
    heatData: HeatData[];
  };
}

interface IAddWave extends Action {
  payload: {
    surferIndex: number;
    waveIndex: number;
    score: number;
  };
}

export const heatSlice = createSlice({
  name: "heat",
  initialState,
  reducers: {
    initializeHeat: (state, action: IInitializeHeat) => {
      const { heatData } = action.payload;
      state.heatData = heatData;
    },
    updateHeat: (state, action: IUpdateHeat) => {
      const { heatData } = action.payload;
      state.heatData = heatData;
    },
    addWave: (state, action: IAddWave) => {
      const { surferIndex, waveIndex, score } = action.payload;
      state.heatData[surferIndex].waveScores[waveIndex] = score;
    },
  },
});

export const { addWave, initializeHeat } = heatSlice.actions;
export const heatReducer = heatSlice.reducer;

export const valueSelector = (state: RootState) => state.heat.heatData;
