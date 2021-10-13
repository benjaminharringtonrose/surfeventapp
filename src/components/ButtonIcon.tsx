import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from ".";
import { sharedColors, spacings } from "../common";
import { useColors } from "../hooks/useColors";

interface IButtonIconProps {
  name: string;
  onPress: () => void;
}

export const ButtonIcon = (props: IButtonIconProps) => {
  const colors = useColors();

  return (
    <TouchableOpacity style={{ paddingHorizontal: spacings.base }} onPress={props.onPress}>
      <Icon name={props.name} size={24} color={colors.icon} />
    </TouchableOpacity>
  );
};
