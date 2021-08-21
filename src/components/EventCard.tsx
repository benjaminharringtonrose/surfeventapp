import moment from "moment";
import React from "react";
import { View, Text } from "react-native";
import { colors, shared, spacings } from "../common";

interface IEventCardProps {
  eventName?: string;
  dateStart?: string;
  timeStart?: string;
  dateEnd: string;
}

export const EventCard = (props: IEventCardProps) => {
  return (
    <View
      style={{
        ...shared.card,
        ...shared.shadow,
        marginBottom: spacings.base,
        marginHorizontal: spacings.base,
        padding: spacings.base,
      }}>
      <View>
        {/* {!!props.eventName && (
          <Text
            style={{
              fontSize: 24,
              fontWeight: "500",
              color: colors.almostWhite,
              marginBottom: spacings.small,
            }}>
            {props.eventName}
          </Text>
        )} */}
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "400",
              color: colors.almostWhite,
            }}>
            {"From"}
          </Text>
          {!!props.dateStart && (
            <Text style={{ fontSize: 16, fontWeight: "400", color: colors.almostWhite }}>
              {moment(props.dateStart).format("dddd, MMMM Do")}
            </Text>
          )}
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginTop: spacings.small,
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "400",
              color: colors.almostWhite,
            }}>
            {"Until"}
          </Text>
          {!!props.dateEnd && (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: colors.almostWhite,
              }}>
              {moment(props.dateEnd).format("dddd, MMMM Do")}
            </Text>
          )}
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginTop: spacings.small,
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "400",
              color: colors.almostWhite,
            }}>
            {"Time"}
          </Text>
          {!!props.dateStart && (
            <Text style={{ fontSize: 16, fontWeight: "400", color: colors.almostWhite }}>
              {props.timeStart}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
