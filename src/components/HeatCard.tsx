import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import moment from "moment";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import { colors, ESA_DIVISIONS, shared, spacings } from "../common";
import { getHeatDivisionLabel } from "../common/util";

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
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: spacings.base }}>
        {!!props?.title && (
          <View>
            <Text style={{ fontSize: 21, fontWeight: "400", color: colors.almostWhite }}>
              {props.title}
            </Text>
          </View>
        )}
        {!!props?.division && (
          <View>
            <Text
              style={{
                fontSize: 21,
                fontWeight: "400",
                color: colors.almostWhite,
              }}>{` - ${getHeatDivisionLabel(props.division)}`}</Text>
          </View>
        )}
      </View>
      <View style={[styles.dateContainer, { flex: 3, flexDirection: "row" }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.font}>{"Date"}</Text>
        </View>
        {!!props?.dateStart && (
          <View style={{ flex: 2 }}>
            <Text style={styles.font}>
              {moment(props.dateStart.toDate()).format("dddd, MMMM Do")}
            </Text>
          </View>
        )}
      </View>
      <View
        style={
          (styles.timeContainer, { flex: 3, flexDirection: "row", marginTop: spacings.small })
        }>
        <View style={{ flex: 1 }}>
          <Text style={styles.font}>{"Time"}</Text>
        </View>
        {!!props?.timeStart && (
          <View style={{ flex: 2 }}>
            <Text style={styles.font}>{moment(props.timeStart.toDate()).format("hh:mm a")}</Text>
          </View>
        )}
      </View>
      <View style={[styles.surfersContainer, { flex: 3, flexDirection: "row" }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.font}>{"Surfers"}</Text>
        </View>

        {!props.surfers && (
          <View style={{ flex: 2 }}>
            <FlatList
              data={SURFERS}
              keyExtractor={item => item}
              renderItem={({ item }) => {
                return <Text style={styles.font}>{item}</Text>;
              }}
            />
          </View>
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
    marginBottom: spacings.xsmall,
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
    justifyContent: "space-between",
    flexDirection: "row",
  },
  surfersContainer: {
    marginTop: spacings.small,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
