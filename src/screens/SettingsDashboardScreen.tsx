import React from "react";
import { View, SafeAreaView } from "react-native";
import { Button } from "../components/Button";
import { spacings } from "../styles";
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          type={"contained"}
          label={"Sign Out"}
          onPress={onSignOut}
          style={{ marginTop: spacings.base }}
        />
      </View>
    </SafeAreaView>
  );
};
