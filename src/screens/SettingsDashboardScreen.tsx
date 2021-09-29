import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Button } from "../components/Button";
import { colors, spacings } from "../common";
import auth from "@react-native-firebase/auth";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

export const SettingsDashboardScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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
        backgroundColor: colors.background,
      }}>
      <SegmentedControl
        values={["Light Mode", "Dark Mode", "System"]}
        selectedIndex={selectedIndex}
        onChange={event => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        style={{ marginTop: spacings.base, marginHorizontal: spacings.base }}
      />
      <Button
        type={"contained"}
        label={"Sign Out"}
        onPress={onSignOut}
        style={{ marginTop: spacings.base, marginHorizontal: spacings.base }}
      />
    </SafeAreaView>
  );
};
