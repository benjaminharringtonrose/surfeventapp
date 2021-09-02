import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { colors, fonts, spacings } from "../common";

export const EventDashboardSurferScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <Text style={styles.cardText}>{"EVENT DASHBOARD SURFER SCREEN"}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardText: {
    ...fonts.large,
    color: colors.grey700,
    textAlign: "center",
    padding: spacings.base,
  },
});
