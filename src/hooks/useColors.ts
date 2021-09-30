import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { DarkTheme, Theme, LightTheme } from "../common";
import { modeSelector } from "../store/slices/settingsSlice";
import { useAppSelector } from "./redux";

export const useColors = () => {
  const [colors, setColors] = useState<Theme>(LightTheme);
  const isDarkMode = useColorScheme() === "dark";
  const mode = useAppSelector(state => modeSelector(state));

  useEffect(() => {
    if (mode === "dark") {
      setColors(DarkTheme);
    } else if (mode === "light") {
      setColors(LightTheme);
    } else if (mode === "system") {
      if (isDarkMode) {
        setColors(DarkTheme);
      } else {
        setColors(LightTheme);
      }
    }
  });

  return colors;
};
