import React from "react";
import { Text, SafeAreaView } from "react-native";
import { colors, fonts, User } from "../common";
import { NavigationProps } from "../navigation";

interface ProfileEditAdminScreenProps {
  user: User;
  navigation: NavigationProps["ProfileEdit"]["navigation"];
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
