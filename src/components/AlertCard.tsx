import React from "react";
import { View, Text } from "react-native";
import { colors, shared, spacings } from "../common";

interface AlertCardProps {
  title: string;
  description: string;
}

export const AlertCard = (props: AlertCardProps) => {
  return (
    <View
      style={{
        ...shared.card,
        ...shared.shadow,
        minHeight: 60,
        backgroundColor: colors.greyscale5,
        marginHorizontal: spacings.base,
        marginTop: spacings.base,
      }}>
      <View style={{ margin: spacings.small, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "300",
            color: colors.almostWhite,
            textAlign: "center",
          }}>
          {props.title}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "400",
            color: colors.grey700,
            textAlign: "center",
            paddingTop: spacings.xsmall,
          }}>
          {props.description}
        </Text>
      </View>
    </View>
  );
};
