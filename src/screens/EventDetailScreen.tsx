import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { EventDetailsNavProp, EventDetailsRouteProp } from "../AppNavigator";
import { colors, fonts, shared, spacings } from "../common";
import { ButtonAdd, ButtonBack } from "../components";
import { Alert } from "../components/Alert";
import { ButtonIcon } from "../components/ButtonIcon";
import { HeatCard } from "../components/HeatCard";
import { useEvent } from "../hooks/useEvent";
import { useHeats } from "../hooks/useHeats";

export const EventDetailScreen = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigation = useNavigation<EventDetailsNavProp>();
  const { params } = useRoute<EventDetailsRouteProp>();
  const event = useEvent(params.eventId);
  const heats = useHeats(params.eventId);

  useEffect(() => {
    navigation.setOptions({
      title: "Event Details",
      headerLeft: () => <ButtonBack onPress={() => navigation.pop()} />,
      headerRight: () => <ButtonIcon name={"pencil"} onPress={() => setShowAlert(true)} />,
    });
  }, []);

  const onEditEvent = () => {};

  if (!event) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <FlatList
        data={heats}
        keyExtractor={item => item.heatId}
        ListHeaderComponent={
          <>
            <View style={{ marginLeft: spacings.base, marginTop: spacings.base }}>
              <Text style={fonts.header}>{event.eventName}</Text>
              <Text style={fonts.subheader}>
                {`${moment(event.dateStart).format("MMM DD")} - ${moment(event.dateEnd).format(
                  "DD",
                )}`}
              </Text>
            </View>
            <ButtonAdd
              label={"Add Surf Heat"}
              onPress={() => navigation.navigate("AddHeat", { eventId: event.eventId })}
              style={{ marginVertical: spacings.base }}
            />
            <View style={{ paddingLeft: spacings.base, paddingBottom: spacings.xsmall }}>
              <Text style={fonts.subheader}>{"Heats"}</Text>
            </View>
          </>
        }
        renderItem={({ item }) => {
          return (
            <HeatCard
              title={item.title}
              eventId={item.eventId}
              heatId={item.heatId}
              division={item.division as string}
              surfers={item.surfers}
              uid={item.uid}
              dateStart={item.dateStart}
              timeStart={item.timeStart}
              onEditHeat={() =>
                navigation.navigate("EditHeat", { eventId: item.eventId, heatId: item.heatId })
              }
              onStartHeat={() => {}}
            />
          );
        }}
        ListFooterComponent={
          <>
            {!heats.length && (
              <View style={styles.card}>
                <Text style={styles.cardText}>{"You haven't added any heats"}</Text>
              </View>
            )}
          </>
        }
      />
      <Alert
        visible={showAlert}
        label={"What would you like to do?"}
        actions={[
          {
            label: "Edit Event",
            onPress: onEditEvent,
            type: "contained",
          },
          {
            label: "Cancel",
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacings.base,
    marginHorizontal: spacings.base,
  },
  cardText: {
    ...fonts.large,
    color: colors.grey500,
    textAlign: "center",
    padding: spacings.base,
  },
});
