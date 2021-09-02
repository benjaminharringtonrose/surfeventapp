import AsyncStorage from "@react-native-async-storage/async-storage";

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
