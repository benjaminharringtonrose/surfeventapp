import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import moment from "moment";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import { colors, shared, spacings } from "../common";

interface IHeatCardProps {
  eventId?: string;
  heatId?: string;
  heatType?: string;
  title?: string;
  surfers?: string[];
  division?: string;
  dateStart?: FirebaseFirestoreTypes.Timestamp;
  timeStart?: FirebaseFirestoreTypes.Timestamp;
  uid?: string;
  onPress?: () => void;
}

export const HeatCard = (props: IHeatCardProps) => {
  return (
    <TouchableOpacity style={styles.rootContainer} onPress={props?.onPress}>
      {!!props?.title && (
        <View>
          <Text style={{ fontSize: 21, fontWeight: "400", color: colors.almostWhite }}>
            {props.title}
          </Text>
        </View>
      )}
      {!!props?.division && (
        <View style={{ paddingBottom: spacings.small }}>
          <Text style={{ fontSize: 21, fontWeight: "200", color: colors.almostWhite }}>
            {props.division}
          </Text>
        </View>
      )}
      <View style={styles.dateContainer}>
        <Text style={styles.font}>{"Date"}</Text>
        {!!props?.dateStart && (
          <Text style={styles.font}>
            {moment(props.dateStart.toDate()).format("dddd, MMMM Do")}
          </Text>
        )}
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.font}>{"Time"}</Text>
        {!!props?.timeStart && (
          <Text style={styles.font}>{moment(props.timeStart.toDate()).format("hh:mm a")}</Text>
        )}
      </View>
      <View style={styles.surfersContainer}>
        <Text style={styles.font}>{"Surfers"}</Text>
        {!props.surfers && (
          <FlatList
            data={SURFERS}
            keyExtractor={item => item}
            renderItem={({ item }) => {
              return <Text style={styles.font}>{item}</Text>;
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const SURFERS = ["Johnny Appleseed", "Ricky Tutor", "Sammy Soda", "Little Gram"];

const styles = StyleSheet.create({
  rootContainer: {
    ...shared.card,
    ...shared.shadow,
    marginBottom: spacings.base,
    marginHorizontal: spacings.base,
    padding: spacings.base,
  },
  font: {
    fontSize: 17,
    fontWeight: "400",
    color: colors.grey500,
  },
  dateContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  timeContainer: {
    marginTop: spacings.small,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  surfersContainer: {
    marginTop: spacings.small,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
