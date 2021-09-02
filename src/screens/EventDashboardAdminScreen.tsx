import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";

import { ButtonAdd } from "../components";
import { EventNavProp } from "../AppNavigator";
import { colors, Event, fonts, shared, spacings } from "../common";
import { EventAddModal } from "../modals/EventAddModal";
import { useEvents } from "../hooks/useEvents";
import { EventButton } from "../components/EventButton";
import { Alert } from "../components/Alert";
import { useAppSelector } from "../hooks/redux";
import moment from "moment";

export const EventDashboardAdminScreen = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const addEventModalRef = useRef<Modalize>(null);
  const navigation = useNavigation<EventNavProp>();
  const events = useEvents();
  const eventId = useAppSelector(state => state.events.eventId);

  useEffect(() => {
    navigation.setOptions({
      title: "SurfEvent",
      headerRight: () => null,
    });
  });

  const onAddHeat = () => {
    if (eventId) {
      setShowAlert(false);
      navigation.navigate("AddHeat", { eventId });
    }
  };

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
              <View style={{ marginLeft: spacings.base, marginVertical: spacings.base }}>
                <Text style={[fonts.header]}>{"Events"}</Text>
                <Text style={[fonts.subheader]}>{"view & create surf events"}</Text>
              </View>
              <ButtonAdd
                label={"add surf event"}
                onPress={() => addEventModalRef.current?.open()}
              />

              <View style={{ padding: spacings.base }}>
                <Text style={{ color: colors.almostWhite, fontSize: 21 }}>{"Today's Event"}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardText}>{"There are no surf events today"}</Text>
              </View>
              <View style={{ padding: spacings.base }}>
                <Text style={{ color: colors.almostWhite, fontSize: 21 }}>{"Upcoming Events"}</Text>
              </View>
            </>
          }
          renderItem={({ item }: { item: Event }) => {
            return (
              <EventButton
                eventName={item.eventName}
                dateStart={moment(item.dateStart.toDate()).format("MMM DD")}
                dateEnd={moment(item.dateEnd.toDate()).format("DD")}
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
      <EventAddModal
        ref={addEventModalRef}
        onClose={() => addEventModalRef.current?.close()}
        onAlert={() => setShowAlert(true)}
      />
      <Alert
        visible={showAlert}
        label={"Would you like to start adding heats?"}
        actions={[
          {
            label: "Add heat",
            onPress: onAddHeat,
            type: "contained",
          },
          {
            label: "Not right now",
            onPress: () => setShowAlert(false),
            type: "bordered",
          },
        ]}
      />
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
