import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import moment from "moment";

import { Icon, ButtonAdd } from "../components";
import { EventNavProp } from "../AppNavigator";
import { colors, fonts, shared, spacings } from "../common";
import { AddEventModal } from "../modals/AddEventModal";
import { useEvents } from "../hooks/useEvents";

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
      <View style={{ marginLeft: spacings.base }}>
        <Text style={[fonts.header]}>{"Events"}</Text>
        <Text style={[fonts.subheader]}>{"view & create events here"}</Text>
      </View>
      <ButtonAdd
        label={"add surf event"}
        onPress={() => addEventModalRef.current?.open()}
        style={{ marginHorizontal: spacings.base }}
      />
      <View style={{ padding: spacings.base }}>
        <Text style={{ color: colors.grey500, fontSize: 21 }}>{"Today's Event"}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>{"There are no events today"}</Text>
      </View>
      <View style={{ padding: spacings.base }}>
        <Text style={{ color: colors.grey500, fontSize: 21 }}>{"Upcoming Events"}</Text>
      </View>
      {!!events ? (
        <FlatList
          data={events}
          keyExtractor={item => item.datetime}
          renderItem={({ item }) => {
            return <EventCard eventName={item.eventName} date={item.date} time={item.time} />;
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

interface IEventCardProps {
  eventName?: string;
  date?: string;
  time?: string;
  onPress?: () => void;
}

export const EventCard = (props: IEventCardProps) => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={{
        ...shared.card,
        ...shared.shadow,
        marginBottom: spacings.base,
        marginHorizontal: spacings.base,
        padding: spacings.base,
      }}>
      <View style={{ flexDirection: "row" }}>
        <View>
          {!!props.eventName && (
            <Text style={{ fontSize: 21, fontWeight: "400", color: colors.almostWhite }}>
              {props.eventName}
            </Text>
          )}
          {!!props.date && (
            <Text style={{ fontSize: 16, fontWeight: "400", color: colors.grey700 }}>
              {moment(props.date).format("dddd, MMMM Do YYYY")}
            </Text>
          )}
          {!!props.time && (
            <Text style={{ fontSize: 16, fontWeight: "400", color: colors.grey700 }}>
              {props.time}
            </Text>
          )}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
          }}>
          <Icon name={"chevron-forward"} size={30} color={colors.grey100} />
        </View>
      </View>
    </TouchableOpacity>
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
    color: colors.grey500,
    textAlign: "center",
    padding: spacings.base,
  },
});
