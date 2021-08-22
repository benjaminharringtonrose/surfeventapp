import moment from "moment";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Icon } from ".";
import { colors, shared, spacings } from "../common";

interface IEventButtonProps {
  eventName?: string;
  dateStart?: string;
  dateEnd?: string;
  onPress?: () => void;
}

export const EventButton = (props: IEventButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      disabled={!props?.onPress}
      style={{
        ...shared.card,
        ...shared.shadow,
        marginBottom: spacings.xsmall,
        marginHorizontal: spacings.base,
        padding: spacings.base,
      }}>
      <View style={{ flex: 10 }}>
        <View style={{ flex: 6, flexDirection: "row" }}>
          <View style={{ flex: 5, flexDirection: "row" }}>
            {!!props.eventName && (
              <Text style={{ fontSize: 18, fontWeight: "500", color: colors.almostWhite }}>
                {props.eventName}
              </Text>
            )}
          </View>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Icon
              name={"chevron-forward"}
              size={21}
              color={colors.grey100}
              style={{ marginLeft: spacings.tiny }}
            />
          </View>
        </View>
        <View style={{ flex: 4, flexDirection: "row" }}>
          {!!props.dateStart && !!props.dateEnd && (
            <Text style={{ fontSize: 16, fontWeight: "400", color: colors.almostWhite }}>
              {`${props.dateStart} - ${props.dateEnd}`}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
