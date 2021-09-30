import AsyncStorage from "@react-native-async-storage/async-storage";
import { Mode } from "../store/slices/settingsSlice";

export const storeVerificationStatus = async (value: "true" | "false") => {
  try {
    await AsyncStorage.setItem("@verification_completed", value);
  } catch (e) {
    console.warn(e);
  }
};

export const getVerificationStatus = async () => {
  try {
    const value = await AsyncStorage.getItem("@verification_completed");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.warn(e);
  }
};

export const storeMode = async (mode: Mode) => {
  try {
    await AsyncStorage.setItem("mode", mode);
  } catch (e) {
    console.warn(e);
  }
};

export const getMode = async () => {
  try {
    const value = await AsyncStorage.getItem("mode");
    if (value !== null) {
      return value as Mode;
    }
  } catch (e) {
    console.warn(e);
  }
};
