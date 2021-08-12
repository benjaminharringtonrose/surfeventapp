import React from "react";
import { View, SafeAreaView } from "react-native";
import { Button } from "../components/Button";
import { colors, spacings } from "../common";
import auth from "@react-native-firebase/auth";

export const SettingsDashboardScreen = () => {
  const onSignOut = async () => {
    try {
      await auth().signOut();
      console.log("User signed out");
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}>
      <Button
        type={"contained"}
        label={"Sign Out"}
        onPress={onSignOut}
        style={{ marginTop: spacings.base }}
      />
    </SafeAreaView>
  );
};
