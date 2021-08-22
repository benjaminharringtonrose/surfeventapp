import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import { EventDetailsNavProp, EventDetailsRouteProp } from "../AppNavigator";
import { colors, fonts, shared, spacings } from "../common";
import { ButtonAdd, ButtonBack } from "../components";
import { EventButton } from "../components/EventButton";
import { HeatCard } from "../components/HeatCard";
import { useEvent } from "../hooks/useEvent";
import { useHeats } from "../hooks/useHeats";
import { AddHeatModal } from "../modals/AddHeatModal";

export const EventDetailScreen = () => {
  const addHeatModalRef = useRef<Modalize>(null);
  const navigation = useNavigation<EventDetailsNavProp>();
  const { params } = useRoute<EventDetailsRouteProp>();
  const event = useEvent(params.eventId);
  const heats = useHeats(params.eventId);

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
      {!!heats ? (
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
            return (
              <HeatCard
                title={item.title}
                eventId={item.eventId}
                heatId={item.heatId}
                division={item.division}
                surfers={item.surfers}
                uid={item.uid}
                dateStart={item.dateStart}
                timeStart={item.timeStart}
                onPress={() => {}}
              />
            );
          }}
          ListFooterComponent={
            <>
              <AddHeatModal
                ref={addHeatModalRef}
                onClose={() => addHeatModalRef.current?.close()}
                eventId={params.eventId}
              />
            </>
          }
        />
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardText}>{"You haven't created any events"}</Text>
        </View>
      )}
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
