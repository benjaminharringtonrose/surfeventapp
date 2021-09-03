import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";

import { ButtonAdd } from "../components";
import { EventNavProp } from "../AppNavigator";
import { colors, Event, fonts, shared, spacings, User } from "../common";
import { EventAddModal } from "../modals/EventAddModal";
import { useEvents } from "../hooks/useEvents";
import { EventButton } from "../components/EventButton";
import { Alert } from "../components/Alert";
import { useAppSelector } from "../hooks/redux";
import moment from "moment";
import { useOrganization } from "../hooks/useOrganization";
import { AlertCard } from "../components/AlertCard";

interface EventDashboardAdminProps {
  user: User;
  events?: Event[];
  navigation: EventNavProp;
}

export const EventDashboardAdminScreen = (props: EventDashboardAdminProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const addEventModalRef = useRef<Modalize>(null);
  const navigation = useNavigation<EventNavProp>();
  const user = props.user;
  const organization = useOrganization(user.organizationId!);
  const eventId = useAppSelector(state => state.events.eventId);

  useEffect(() => {
    navigation.setOptions({
      title: organization?.name,
      headerRight: () => null,
    });
  });

  const onAddHeat = () => {
    if (eventId) {
      setShowAlert(false);
      navigation.navigate("AddHeat", { eventId });
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
          ListHeaderComponent={
            <>
              {user.isUserRolePending && (
                <AlertCard
                  title={"Your administration request is being processed"}
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
                <Text style={{ color: colors.almostWhite, fontSize: 21 }}>
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
                onPress={() => navigation.navigate("EventDetailAdmin", { eventId: item.eventId })}
              />
            );
          }}
          ListFooterComponent={
            <View style={styles.card}>
              {!props.events.length && (
                <Text style={styles.cardText}>{"You haven't created any events"}</Text>
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
    color: colors.grey700,
    textAlign: "center",
    padding: spacings.base,
  },
});
