import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { EventNavProp } from "../AppNavigator";
import { useUser } from "../hooks/useUser";
import { EventDashboardAdminScreen } from "./EventDashboardAdminScreen";
import { EventDashboardSurferScreen } from "./EventDashboardSurferScreen";

export const EventDashboardScreen = () => {
  const navigation = useNavigation<EventNavProp>();
  const user = useUser();

  useEffect(() => {
    navigation.setOptions({
      title: "SurfEvent",
      headerRight: () => null,
    });
  });

  if (!user) return null;

  if (user?.isAdmin) {
    return <EventDashboardAdminScreen user={user} navigation={navigation} />;
  } else {
    return <EventDashboardSurferScreen user={user} navigation={navigation} />;
  }
};
