import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "../components/Button";
import { spacings } from "../common";
import auth from "@react-native-firebase/auth";
import SegmentedControl, {
  NativeSegmentedControlIOSChangeEvent,
} from "@react-native-segmented-control/segmented-control";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { modeSelector, setMode } from "../store/slices/settingsSlice";
import { storeMode } from "../util/asyncStorgage";
import { useColors } from "../hooks/useColors";

export const SettingsDashboardScreen = () => {
  const mode = useAppSelector(state => modeSelector(state));
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const dispatch = useAppDispatch();
  const colors = useColors();

  useEffect(() => {
    switch (mode) {
      case "dark":
        return setSelectedIndex(1);
      case "system":
        return setSelectedIndex(2);
      case "light":
      default:
        return;
    }
  }, []);

  const onSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.warn(error);
    }
  };

  const onChangeMode = (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
    const selectedSegmentIndex = event.nativeEvent.selectedSegmentIndex;
    setSelectedIndex(selectedSegmentIndex);
    switch (selectedSegmentIndex) {
      case 0:
        dispatch(setMode({ mode: "light" }));
        return storeMode("light");
      case 1:
        dispatch(setMode({ mode: "dark" }));
        return storeMode("dark");
      case 2:
        dispatch(setMode({ mode: "system" }));
        return storeMode("system");
      default:
        return;
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
        onChange={onChangeMode}
        style={[styles.margins, { backgroundColor: colors.segmentControl }]}
      />
      <Button type={"contained"} label={"Sign Out"} onPress={onSignOut} style={styles.margins} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  margins: { marginTop: spacings.base, marginHorizontal: spacings.base },
});
