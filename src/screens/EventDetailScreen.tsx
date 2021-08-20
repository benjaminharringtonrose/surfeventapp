import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { EventDetailsNavProp, EventStackParamList } from "../AppNavigator";
import { colors, spacings } from "../common";
import { ButtonAdd, ButtonBack } from "../components";
import { EventCard } from "../components/EventCard";
import { useEvent } from "../hooks/useEvent";

export const EventDetailScreen = () => {
  const navigation = useNavigation<EventDetailsNavProp>();
  const event = useEvent();

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
      <ScrollView>
        <EventCard
          eventName={event.eventName}
          dateStart={event.dateStart}
          dateEnd={event.dateEnd}
          timeStart={event.timeStart}
        />
        <ButtonAdd label={"Add Heats"} onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
};
