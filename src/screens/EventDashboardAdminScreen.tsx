import React, { useRef, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";

import { ButtonAdd } from "../components";
import { NavigationProps } from "../navigation";
import { Event, fonts, shared, spacings, User } from "../common";
import { EventAddModal } from "../modals/EventAddModal";
import { EventButton } from "../components/EventButton";
import { Alert } from "../components/Alert";
import { useAppSelector } from "../hooks/redux";
import moment from "moment";
import { AlertCard } from "../components/AlertCard";
import { useColors } from "../hooks/useColors";

interface EventDashboardAdminProps {
  user: User;
  events?: Event[];
  navigation: NavigationProps["Events"]["navigation"];
}

export const EventDashboardAdminScreen = (props: EventDashboardAdminProps) => {
  const colors = useColors();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const addEventModalRef = useRef<Modalize>(null);
  const user = props.user;
  const eventId = useAppSelector(state => state.events.eventId);

  const onAddHeat = () => {
    if (eventId) {
      setShowAlert(false);
      props.navigation.navigate("AddHeat", { eventId });
    }
  };

  if (!props.events) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      {!!props.events && (
        <FlatList
          data={props.events}
          keyExtractor={item => item.eventId}
          contentContainerStyle={{ backgroundColor: colors.background }}
          ListHeaderComponent={
            <>
              {user.state === "pending" && (
                <AlertCard
                  title={"You've requested administration access"}
                  description={
                    "Once your admin access is approved, other organization members can see the events you've added."
                  }
                />
              )}
              <ButtonAdd
                label={"add surf event"}
                onPress={() => addEventModalRef.current?.open()}
                style={{ marginTop: spacings.base }}
              />
              <View style={{ padding: spacings.base }}>
                <Text style={{ color: colors.headerText, fontSize: 21 }}>
                  {"Upcoming Competitions"}
                </Text>
              </View>
            </>
          }
          renderItem={({ item }: { item: Event }) => {
            return (
              <EventButton
                eventName={item.eventName}
                dateStart={moment(item.dateStart.toDate()).format("MMM DD")}
                dateEnd={moment(item.dateEnd.toDate()).format("DD")}
                onPress={() =>
                  props.navigation.navigate("EventDetail", {
                    eventId: item.eventId,
                  })
                }
              />
            );
          }}
          ListFooterComponent={
            <View style={styles.card}>
              {!props.events.length && (
                <Text style={[styles.cardText, { color: colors.grey700 }]}>
                  {"You haven't created any events"}
                </Text>
              )}
            </View>
          }
        />
      )}
      <EventAddModal
        ref={addEventModalRef}
        user={user}
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
    textAlign: "center",
    padding: spacings.base,
  },
});
