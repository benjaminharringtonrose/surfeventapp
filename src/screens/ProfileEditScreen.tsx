import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { EventNavProp } from "../AppNavigator";
import { ButtonBack } from "../components";
import { useOrganizations } from "../hooks/useOrganizations";
import { useUser } from "../hooks/useUser";
import { ProfileEditAdminScreen } from "./ProfileEditAdminScreen";
import { ProfileEditSurferScreen } from "./ProfileEditSurferScreen";

export const ProfileEditScreen = () => {
  const navigation = useNavigation<EventNavProp>();
  const user = useUser();
  const organizations = useOrganizations();

  useEffect(() => {
    navigation.setOptions({
      title: "Update Profile",
      headerLeft: () => <ButtonBack onPress={() => navigation.pop()} />,
      headerRight: () => null,
    });
  });

  if (!user) return null;

  if (user?.isAdmin) {
    return <ProfileEditAdminScreen user={user} navigation={navigation} />;
  } else {
    return (
      <ProfileEditSurferScreen user={user} navigation={navigation} organizations={organizations} />
    );
  }
};
