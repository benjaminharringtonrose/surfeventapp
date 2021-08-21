import moment from "moment";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Icon } from ".";
import { colors, shared, spacings } from "../common";

interface IEventButtonProps {
  eventName?: string;
  dateStart?: string;
  timeStart?: string;
  dateEnd?: string;
  onPress?: () => void;
}

export const EventButton = (props: IEventButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      disabled={!props?.onPress}
      style={{
        flex: 1,
        ...shared.card,
        ...shared.shadow,
        marginBottom: spacings.xsmall,
        marginHorizontal: spacings.base,
        padding: spacings.base,
      }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {!!props.dateStart && !!props.dateEnd && (
          <Text style={{ flex: 2, fontSize: 16, fontWeight: "400", color: colors.almostWhite }}>
            {`${moment(props.dateStart).format("MMM DD")} - ${moment(props.dateEnd).format("DD")}`}
          </Text>
        )}
        {!!props.eventName && (
          <Text style={{ fontSize: 18, fontWeight: "500", color: colors.almostWhite }}>
            {props.eventName}
          </Text>
        )}
        {!!props?.onPress && (
          <Icon
            name={"chevron-forward"}
            size={21}
            color={colors.grey100}
            style={{ marginLeft: spacings.tiny }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
