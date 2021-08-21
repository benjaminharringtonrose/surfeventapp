import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";

import { ButtonAdd } from "../components";
import { EventNavProp } from "../AppNavigator";
import { colors, fonts, shared, spacings } from "../common";
import { AddEventModal } from "../modals/AddEventModal";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/EventCard";
import { EventButton } from "../components/EventButton";

export const EventDashboardScreen = () => {
  const addEventModalRef = useRef<Modalize>(null);
  const navigation = useNavigation<EventNavProp>();

  const events = useEvents();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => {}} style={{ marginHorizontal: spacings.base }}>
            {/* <Icon name={"timer"} size={32} color={colors.almostWhite} /> */}
          </TouchableOpacity>
        );
      },
    });
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      {!!events ? (
        <FlatList
          data={events}
          keyExtractor={item => item.eventId}
          ListHeaderComponent={
            <>
              <View style={{ marginLeft: spacings.base }}>
                <Text style={[fonts.header]}>{"Events"}</Text>
                <Text style={[fonts.subheader]}>{"view & create events"}</Text>
              </View>
              <ButtonAdd
                label={"add surf event"}
                onPress={() => addEventModalRef.current?.open()}
              />
              <View style={{ padding: spacings.base }}>
                <Text style={{ color: colors.almostWhite, fontSize: 21 }}>{"Today's Event"}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardText}>{"There are no events today"}</Text>
              </View>
              <View style={{ padding: spacings.base }}>
                <Text style={{ color: colors.almostWhite, fontSize: 21 }}>{"Upcoming Events"}</Text>
              </View>
            </>
          }
          renderItem={({ item }) => {
            return (
              <EventButton
                eventName={item.eventName}
                dateStart={item.dateStart}
                dateEnd={item.dateEnd}
                timeStart={item.timeStart}
                onPress={() => navigation.navigate("EventDetails", { eventId: item.eventId })}
              />
            );
          }}
        />
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardText}>{"You haven't created any events"}</Text>
        </View>
      )}
      <AddEventModal ref={addEventModalRef} onClose={() => addEventModalRef.current?.close()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    ...shared.card,
    ...shared.shadow,
    marginBottom: spacings.base,
    marginHorizontal: spacings.base,
  },
  cardText: {
    ...fonts.large,
    color: colors.grey700,
    textAlign: "center",
    padding: spacings.base,
  },
});
