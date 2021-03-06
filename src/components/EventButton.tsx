import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Icon } from ".";
import { shared, spacings } from "../common";
import { useColors } from "../hooks/useColors";

interface IEventButtonProps {
  eventName?: string;
  dateStart?: string;
  dateEnd?: string;
  onPress?: () => void;
}

export const EventButton = (props: IEventButtonProps) => {
  const colors = useColors();
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.card, colors.cardDark]}
      style={{
        ...shared.card,
        ...shared.shadow,
        borderWidth: 1,
        borderColor: colors.borderColor,
        backgroundColor: colors.card,
        marginBottom: spacings.xsmall,
        marginHorizontal: spacings.base,
        paddingHorizontal: spacings.base,
        paddingVertical: spacings.xsmall,
      }}>
      <TouchableOpacity onPress={props?.onPress} disabled={!props?.onPress}>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              {!!props.eventName && (
                <Text style={{ fontSize: 20, fontWeight: "500", color: colors.headerText }}>
                  {props.eventName}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              {!!props.dateStart && !!props.dateEnd && (
                <Text style={{ fontSize: 16, fontWeight: "400", color: colors.subheaderText }}>
                  {`${props.dateStart} - ${props.dateEnd}`}
                </Text>
              )}
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
            <Icon
              name={"chevron-forward"}
              size={21}
              color={colors.headerText}
              style={{ marginLeft: spacings.tiny }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};
