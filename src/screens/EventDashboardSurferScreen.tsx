import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { colors, fonts, spacings, User } from "../common";

interface EventDashboardSurferProps {
  user: User;
}

export const EventDashboardSurferScreen = (props: EventDashboardSurferProps) => {
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
