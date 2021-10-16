import React from "react";
import { View, Text } from "react-native";
import { shared, spacings } from "../common";
import { useColors } from "../hooks/useColors";

interface AlertCardProps {
  title: string;
  description: string;
}

export const AlertCard = (props: AlertCardProps) => {
  const colors = useColors();

  return (
    <View
      style={{
        ...shared.card,
        ...shared.shadow,
        minHeight: 60,
        backgroundColor: colors.primary,
        marginHorizontal: spacings.base,
        marginTop: spacings.base,
        borderColor: colors.borderColor,
        borderWidth: 1,
      }}>
      <View style={{ margin: spacings.small, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "600",
            color: colors.white,
            textAlign: "center",
          }}>
          {props.title}
        </Text>
        <Text
          style={{
            paddingTop: spacings.xsmall,
            fontSize: 17,
            fontWeight: "400",
            color: colors.white,
            textAlign: "center",
          }}>
          {props.description}
        </Text>
      </View>
    </View>
  );
};
