import React from "react";
import { Text, SafeAreaView } from "react-native";
import { EventNavProp } from "../AppNavigator";
import { colors, fonts, User } from "../common";

interface ProfileEditAdminScreenProps {
  user: User;
  navigation: EventNavProp;
}

export const ProfileEditAdminScreen = (props: ProfileEditAdminScreenProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <Text style={fonts.header}>{"PROFILE EDIT ADMIN SCREEN"}</Text>
    </SafeAreaView>
  );
};
