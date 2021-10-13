import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Modalize } from "react-native-modalize";
import { fonts, Heat, shared, sharedColors, spacings } from "../common";
import { ButtonAdd, ButtonBack } from "../components";
import { ButtonIcon } from "../components/ButtonIcon";
import { HeatCard } from "../components/HeatCard";
import { useAppDispatch } from "../hooks/redux";
import { EventEditModal } from "../modals/EventEditModal";
import { setTime } from "../store/slices/heatSlice";
import { getHeatDivisionLabel } from "../common/util";
import { Event } from "../common/models";
import { NavigationProps } from "../navigation";
import { useColors } from "../hooks/useColors";

interface EventDetailSurferScreenProps {
  navigation: NavigationProps["EventDetail"]["navigation"];
  event?: Event;
  heats?: Heat[];
}

export const EventDetailAdminScreen = (props: EventDetailSurferScreenProps) => {
  const colors = useColors();
  const editEventModalRef = useRef<Modalize>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    props.navigation.setOptions({
      title: "Event Details",
      headerLeft: () => <ButtonBack onPress={() => props.navigation.pop()} />,
      headerRight: () => (
        <ButtonIcon name={"pencil"} onPress={() => editEventModalRef.current?.open()} />
      ),
    });
  }, []);

  if (!props.event || !props.heats)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <FlatList
        data={props.heats}
        keyExtractor={item => item.heatId}
        ListHeaderComponent={
          <>
            <View style={{ marginLeft: spacings.base, marginTop: spacings.base }}>
              <Text style={[fonts.header, { color: colors.headerText }]}>
                {props.event.eventName}
              </Text>
              <Text style={fonts.subheader}>
                {`${moment(props.event.dateStart.toDate()).format("MMM DD")} - ${moment(
                  props.event.dateEnd.toDate(),
                ).format("DD")}`}
              </Text>
            </View>
            <ButtonAdd
              label={"Add Heat"}
              onPress={() => {
                if (props.event?.eventId) {
                  props.navigation.navigate("AddHeat", { eventId: props.event?.eventId });
                }
              }}
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
                props.navigation.navigate("EditHeat", {
                  eventId: item.eventId,
                  heatId: item.heatId,
                });
              }}
              onStartHeat={() => {
                dispatch(setTime({ timer: { mins: 15, secs: 0 } }));
                props.navigation.navigate("HeatSheet", {
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
            {!props.heats.length && (
              <View style={styles.card}>
                <Text style={styles.cardText}>{"You haven't added any heats"}</Text>
              </View>
            )}
          </>
        }
      />
      <EventEditModal
        ref={editEventModalRef}
        event={props.event}
        onClose={() => editEventModalRef.current?.close()}
        navigation={props.navigation}
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
    color: sharedColors.grey500,
    textAlign: "center",
    padding: spacings.base,
  },
});
