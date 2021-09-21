import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { EventDetailsRouteProp, EventDetailsNavProp } from "../navigation";
import { colors } from "../common";
import { useUser } from "../hooks/useUser";
import { EventDetailAdminScreen } from "./EventDetailAdminScreen";
import { EventDetailSurferScreen } from "./EventDetailSurferScreen";
import { useEvent } from "../hooks/useEvent";
import { useHeats } from "../hooks/useHeats";

export const EventDetailScreen = () => {
  const navigation = useNavigation<EventDetailsNavProp>();
  const { params } = useRoute<EventDetailsRouteProp>();
  const { user } = useUser();
  const event = useEvent(params.eventId);
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
