import { Action, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface JudgeState {
  value?: any;
}

const initialState: JudgeState = {};

interface IAction extends Action {
  payload: {
    value: any;
  };
}

export const judgeSlice = createSlice({
  name: "judge",
  initialState,
  reducers: {
    action: (state, action: IAction) => {
      const { value } = action.payload;
      state.value = value;
    },
  },
});

export const { action } = judgeSlice.actions;
export const judgeReducer = judgeSlice.reducer;

export const valueSelector = (state: RootState) => state.judge.value;
