import React from "react";
import { Text, SafeAreaView } from "react-native";
import { EventNavProp } from "../AppNavigator";
import { colors, fonts, User } from "../common";

interface ProfileEditSurferScreenProps {
  user: User;
  navigation: EventNavProp;
}

export const ProfileEditSurferScreen = (props: ProfileEditSurferScreenProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <Text style={fonts.header}>{"PROFILE EDIT SURFER SCREEN"}</Text>
    </SafeAreaView>
  );
};
