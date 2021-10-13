import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import moment from "moment";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { shared, spacings } from "../common";
import { getHeatDivisionLabel } from "../common/util";
import { useColors } from "../hooks/useColors";
import { Button } from "./Button";

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
  onStartHeat?: () => void;
  onEditHeat?: () => void;
}

export const HeatCard = (props: IHeatCardProps) => {
  const colors = useColors();
  return (
    <View style={[styles.rootContainer, { backgroundColor: colors.card }]}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: spacings.base }}>
        {!!props?.title && !!props?.division && (
          <View>
            <Text style={{ fontSize: 21, fontWeight: "400", color: colors.headerText }}>
              {`${props.title}:`}
            </Text>
            <Text
              style={{
                fontSize: 21,
                fontWeight: "400",
                color: colors.headerText,
                paddingTop: spacings.xsmall,
              }}>
              {getHeatDivisionLabel(props.division)}
            </Text>
          </View>
        )}
      </View>
      <View style={[styles.dateContainer, { flex: 3, flexDirection: "row" }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.font, { color: colors.bodyText }]}>{"Date"}</Text>
        </View>
        {!!props?.dateStart && (
          <View style={{ flex: 2 }}>
            <Text style={[styles.font, { color: colors.bodyText }]}>
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
          <Text style={[styles.font, { color: colors.bodyText }]}>{"Time"}</Text>
        </View>
        {!!props?.timeStart && (
          <View style={{ flex: 2 }}>
            <Text style={[styles.font, { color: colors.bodyText }]}>
              {moment(props.timeStart.toDate()).format("hh:mm a")}
            </Text>
          </View>
        )}
      </View>
      <View style={[styles.surfersContainer, { flex: 3, flexDirection: "row" }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.font, { color: colors.bodyText }]}>{"Surfers"}</Text>
        </View>

        {!!props?.surfers && (
          <View style={{ flex: 2 }}>
            <FlatList
              data={props.surfers}
              keyExtractor={item => item}
              renderItem={({ item }) => {
                return <Text style={[styles.font, { color: colors.bodyText }]}>{item}</Text>;
              }}
            />
          </View>
        )}
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View style={{ flex: 1, marginHorizontal: spacings.tiny, marginTop: spacings.small }}>
          <Button type={"bordered"} label={"Start Heat"} onPress={props.onStartHeat} />
        </View>
        <View style={{ flex: 1, marginHorizontal: spacings.tiny, marginTop: spacings.small }}>
          <Button type={"bordered"} label={"Edit Heat"} onPress={props.onEditHeat} />
        </View>
      </View>
    </View>
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
