import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { EventNavProp } from "../AppNavigator";
import { useUser } from "../hooks/useUser";
import { EventDashboardAdminScreen } from "./EventDashboardAdminScreen";
import { EventDashboardSurferScreen } from "./EventDashboardSurferScreen";

export const EventDashboardScreen = () => {
  const navigation = useNavigation<EventNavProp>();
  const isAdmin = useUser()?.isAdmin;

  useEffect(() => {
    navigation.setOptions({
      title: "SurfEvent",
      headerRight: () => null,
    });
  });

  if (isAdmin) {
    return <EventDashboardAdminScreen />;
  } else {
    return <EventDashboardSurferScreen />;
  }
};
