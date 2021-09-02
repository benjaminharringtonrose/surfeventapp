import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { EventNavProp } from "../AppNavigator";
import { useEvents } from "../hooks/useEvents";
import { useUser } from "../hooks/useUser";
import { EventDashboardAdminScreen } from "./EventDashboardAdminScreen";
import { EventDashboardSurferScreen } from "./EventDashboardSurferScreen";

export const EventDashboardScreen = () => {
  const navigation = useNavigation<EventNavProp>();
  const user = useUser();
  const events = useEvents();

  useEffect(() => {
    navigation.setOptions({
      title: "SurfEvent",
      headerRight: () => null,
    });
  });

  if (!user) return null;

  if (user?.isAdmin) {
    return <EventDashboardAdminScreen user={user} navigation={navigation} events={events} />;
  } else {
    return <EventDashboardSurferScreen user={user} navigation={navigation} events={events} />;
  }
};
