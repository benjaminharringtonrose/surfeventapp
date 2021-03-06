import * as React from "react";
import { StyleProp, TouchableOpacity, ViewStyle, Text } from "react-native";
import { fonts, shared, spacings } from "../common";
import { useColors } from "../hooks/useColors";

export interface NavigationTextButtonProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
export const NavigationTextButton = (props: NavigationTextButtonProps) => {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={[
        props.style,
        {
          backgroundColor: colors.button,
          borderRadius: shared.borderRadius,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: spacings.xsmall,
          paddingHorizontal: spacings.small,
          paddingVertical: spacings.xsmall,
          minHeight: 40,
        },
      ]}
      onPress={props.onPress}>
      <Text style={[fonts.small, { color: colors.white, fontWeight: "600" }]}>{props.label}</Text>
    </TouchableOpacity>
  );
};
