import React from "react";
import { SafeAreaView } from "react-native";
import { EventNavProp } from "../AppNavigator";
import { colors, spacings, User } from "../common";
import { UserInfoCompletionList } from "../components/UserCompletionList";
import { userHasCompletedAdminRequest, userHasCompletedProfile } from "../util";

interface EventDashboardSurferProps {
  user: User;
  navigation: EventNavProp;
}

export const EventDashboardSurferScreen = (props: EventDashboardSurferProps) => {
  const hasCompletedProfile = userHasCompletedProfile(props.user);
  const hasCompletedAdminRequest = userHasCompletedAdminRequest(props.user);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      {(!hasCompletedProfile || !hasCompletedAdminRequest) && (
        <UserInfoCompletionList
          items={[
            {
              label: "User Profile",
              onPress: () => props.navigation.navigate("ProfileEdit"),
              completed: hasCompletedProfile,
            },
            {
              label: "Admin Request",
              onPress: () => {},
              completed: hasCompletedAdminRequest,
            },
          ]}
          onProfile={() => props.navigation.navigate("ProfileEdit")}
          onVerification={() => {}}
          style={{
            marginTop: spacings.base,
            marginHorizontal: spacings.base,
          }}
        />
      )}
    </SafeAreaView>
  );
};
