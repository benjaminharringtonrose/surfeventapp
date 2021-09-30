import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useUser } from "../hooks/useUser";
import { EventDetailAdminScreen } from "./EventDetailAdminScreen";
import { EventDetailSurferScreen } from "./EventDetailSurferScreen";
import { useEvent } from "../hooks/useEvent";
import { useHeats } from "../hooks/useHeats";
import { NavigationProps } from "../navigation";
import { useColors } from "../hooks/useColors";

export const EventDetailScreen = () => {
  const colors = useColors();
  const navigation = useNavigation<NavigationProps["EventDetail"]["navigation"]>();
  const { params } = useRoute<NavigationProps["EventDetail"]["route"]>();
  const { user } = useUser();
  const { event } = useEvent(params.eventId);
  const { heats, loadingHeats, heatsError } = useHeats(params.eventId);

  useEffect(() => {
    navigation.setOptions({
      title: "Event Details",
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
    return <EventDetailAdminScreen navigation={navigation} event={event} heats={heats} />;
  } else {
    return <EventDetailSurferScreen navigation={navigation} event={event} heats={heats} />;
  }
};
