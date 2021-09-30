import React from "react";
import { Text, SafeAreaView } from "react-native";
import { fonts, User } from "../common";
import { useColors } from "../hooks/useColors";
import { NavigationProps } from "../navigation";

interface ProfileEditAdminScreenProps {
  user: User;
  navigation: NavigationProps["ProfileEdit"]["navigation"];
}

export const ProfileEditAdminScreen = (props: ProfileEditAdminScreenProps) => {
  const colors = useColors();
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
