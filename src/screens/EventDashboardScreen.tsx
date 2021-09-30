import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Alert } from "../components/Alert";
import { useColors } from "../hooks/useColors";
import { useEvents } from "../hooks/useEvents";
import { usePendingAdminIds } from "../hooks/usePendingAdminIds";
import { useUser } from "../hooks/useUser";
import { NavigationProps } from "../navigation";
import { EventDashboardAdminScreen } from "./EventDashboardAdminScreen";
import { EventDashboardSurferScreen } from "./EventDashboardSurferScreen";

export const EventDashboardScreen = () => {
  const colors = useColors();
  const navigation = useNavigation<NavigationProps["Events"]["navigation"]>();
  const { user, loadingUser, userError } = useUser();
  const { events, loadingEvents, eventsError } = useEvents();
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
  if (!user || loadingEvents || loadingUser)
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center" }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      {user?.isAdmin ? (
        <EventDashboardAdminScreen user={user} navigation={navigation} events={filteredEvents} />
      ) : (
        <EventDashboardSurferScreen user={user} navigation={navigation} events={filteredEvents} />
      )}
      {!!eventsError && (
        <Alert
          visible={!!eventsError}
          label={eventsError?.message || "Error!"}
          actions={[{ label: "label", onPress: () => {}, type: "contained" }]}
        />
      )}
    </View>
  );
};
