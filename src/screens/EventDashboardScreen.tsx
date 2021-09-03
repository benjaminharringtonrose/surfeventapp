import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { EventNavProp } from "../AppNavigator";
import { colors } from "../common";
import { useEvents } from "../hooks/useEvents";
import { usePendingAdminIds } from "../hooks/usePendingAdminIds";
import { useUser } from "../hooks/useUser";
import { EventDashboardAdminScreen } from "./EventDashboardAdminScreen";
import { EventDashboardSurferScreen } from "./EventDashboardSurferScreen";

export const EventDashboardScreen = () => {
  const navigation = useNavigation<EventNavProp>();
  const user = useUser();
  const events = useEvents();
  const pendingAdminIds = usePendingAdminIds(user?.organizationId);

  const filteredEvents = events?.filter(
    e => !pendingAdminIds?.includes(e.uid) || e.uid === user?.uid,
  );

  useEffect(() => {
    navigation.setOptions({
      title: "SurfEvent",
      headerRight: () => null,
    });
  });

  if (!user)
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center" }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );

  if (user?.isAdmin) {
    return (
      <EventDashboardAdminScreen user={user} navigation={navigation} events={filteredEvents} />
    );
  } else {
    return (
      <EventDashboardSurferScreen user={user} navigation={navigation} events={filteredEvents} />
    );
  }
};
