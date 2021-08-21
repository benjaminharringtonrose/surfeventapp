import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { EventDetailsNavProp, EventDetailsRouteProp } from "../AppNavigator";
import { colors, fonts, spacings } from "../common";
import { ButtonAdd, ButtonBack } from "../components";
import { EventCard } from "../components/EventCard";
import { useEvent } from "../hooks/useEvent";

export const EventDetailScreen = () => {
  const navigation = useNavigation<EventDetailsNavProp>();
  const { params } = useRoute<EventDetailsRouteProp>();
  const event = useEvent(params.eventId);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <ButtonBack onPress={() => navigation.pop()} />,
    });
  }, []);

  if (!event) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <View style={{ marginLeft: spacings.base }}>
        <Text style={fonts.header}>{"Events"}</Text>
        <Text style={fonts.subheader}>{"view & create events"}</Text>
      </View>
      <EventCard
        eventName={event.eventName}
        dateStart={event.dateStart}
        dateEnd={event.dateEnd}
        timeStart={event.timeStart}
      />
      <ButtonAdd label={"Add Heat"} onPress={() => {}} />
    </SafeAreaView>
  );
};
