import moment from "moment";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Icon } from ".";
import { colors, shared, spacings } from "../common";

interface IEventCardProps {
  eventName?: string;
  dateStart?: string;
  timeStart?: string;
  dateEnd: string;
  onPress?: () => void;
}

export const EventCard = (props: IEventCardProps) => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      disabled={!props?.onPress}
      style={{
        flex: 1,
        ...shared.card,
        ...shared.shadow,
        marginBottom: spacings.base,
        marginHorizontal: spacings.base,
        padding: spacings.base,
      }}>
      <View style={{ flex: 1 }}>
        {!!props.eventName && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "500",
              color: colors.almostWhite,
            }}>
            {props.eventName}
          </Text>
        )}
        <View
          style={{
            flex: 3,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginTop: spacings.small,
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              fontWeight: "400",
              color: colors.almostWhite,
            }}>
            {"From"}
          </Text>
          {!!props.dateStart && (
            <Text style={{ flex: 2, fontSize: 16, fontWeight: "400", color: colors.almostWhite }}>
              {moment(props.dateStart).format("dddd, MMMM Do")}
            </Text>
          )}
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginTop: spacings.small,
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              fontWeight: "400",
              color: colors.almostWhite,
            }}>
            {"Until"}
          </Text>
          {!!props.dateEnd && (
            <Text style={{ flex: 2, fontSize: 16, fontWeight: "400", color: colors.almostWhite }}>
              {moment(props.dateEnd).format("dddd, MMMM Do")}
            </Text>
          )}
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginTop: spacings.small,
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              fontWeight: "400",
              color: colors.almostWhite,
            }}>
            {"Time"}
          </Text>
          {!!props.dateStart && (
            <Text style={{ flex: 2, fontSize: 16, fontWeight: "400", color: colors.almostWhite }}>
              {props.timeStart}
            </Text>
          )}
        </View>
        {!!props?.onPress && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: spacings.base,
            }}>
            <Text style={{ fontSize: 16, fontWeight: "400", color: colors.almostWhite }}>
              {"View Event"}
            </Text>
            <Icon name={"chevron-forward"} size={21} color={colors.grey100} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
