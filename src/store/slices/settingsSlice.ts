import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export type Mode = "light" | "dark" | "system";

interface SettingsState {
  mode?: Mode;
}

const initialState: SettingsState = {};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<{ mode?: Mode }>) => {
      console.log("action: --------", action);
      state.mode = action.payload?.mode;
    },
  },
});

export const { setMode } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;

export const modeSelector = (state: RootState) => state.settings.mode;
