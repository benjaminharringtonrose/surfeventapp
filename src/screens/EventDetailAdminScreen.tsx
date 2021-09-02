import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import { EventDetailsNavProp, EventDetailsRouteProp } from "../AppNavigator";
import { colors, fonts, shared, spacings } from "../common";
import { ButtonAdd, ButtonBack } from "../components";
import { ButtonIcon } from "../components/ButtonIcon";
import { HeatCard } from "../components/HeatCard";
import { useAppDispatch } from "../hooks/redux";
import { useEvent } from "../hooks/useEvent";
import { useHeats } from "../hooks/useHeats";
import { EventEditModal } from "../modals/EventEditModal";
import { setTime } from "../store/slices/heatSlice";
import { getHeatDivisionLabel } from "../common/util";

export const EventDetailAdminScreen = () => {
  const editEventModalRef = useRef<Modalize>(null);
  const navigation = useNavigation<EventDetailsNavProp>();
  const dispatch = useAppDispatch();
  const { params } = useRoute<EventDetailsRouteProp>();
  const event = useEvent(params.eventId);
  const heats = useHeats(params.eventId);

  useEffect(() => {
    navigation.setOptions({
      title: "Event Details",
      headerLeft: () => <ButtonBack onPress={() => navigation.pop()} />,
      headerRight: () => (
        <ButtonIcon name={"pencil"} onPress={() => editEventModalRef.current?.open()} />
      ),
    });
  }, []);

  if (!event || !heats) return null;

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
                {`${moment(event.dateStart.toDate()).format("MMM DD")} - ${moment(
                  event.dateEnd.toDate(),
                ).format("DD")}`}
              </Text>
            </View>
            <ButtonAdd
              label={"Add Heat"}
              onPress={() => navigation.navigate("AddHeat", { eventId: event.eventId })}
              style={{ marginVertical: spacings.base }}
            />
            <View style={{ paddingLeft: spacings.base, paddingBottom: spacings.xsmall }}>
              <Text style={fonts.subheader}>{"Heats"}</Text>
            </View>
          </>
        }
        renderItem={({ item }) => {
          let scores = [];
          for (const score in item.scores) {
            scores.push(item.scores[score]);
          }
          const surfers = scores.map(s => s.surfer);
          return (
            <HeatCard
              title={item.title}
              eventId={item.eventId}
              heatId={item.heatId}
              division={item.division as string}
              surfers={surfers}
              uid={item.uid}
              dateStart={item.dateStart}
              timeStart={item.timeStart}
              onEditHeat={() => {
                navigation.navigate("EditHeat", {
                  eventId: item.eventId,
                  heatId: item.heatId,
                });
              }}
              onStartHeat={() => {
                dispatch(setTime({ timer: { mins: 15, secs: 0 } }));
                navigation.navigate("HeatSheet", {
                  title: `Heat #1: ${getHeatDivisionLabel(item.division as string)}`,
                  eventId: item.eventId,
                  heatId: item.heatId,
                });
              }}
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
      <EventEditModal
        ref={editEventModalRef}
        event={event}
        onClose={() => editEventModalRef.current?.close()}
        navigation={navigation}
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
