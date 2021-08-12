import React from "react";
import { Text, SafeAreaView } from "react-native";
import { colors } from "../common";

export const EventDashboardScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}>
      <Text style={{ color: colors.almostWhite }}>{"Not implemented!"}</Text>
    </SafeAreaView>
  );
};
