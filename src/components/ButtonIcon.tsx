import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from ".";
import { sharedColors, spacings } from "../common";

interface IButtonIconProps {
  name: string;
  onPress: () => void;
}

export const ButtonIcon = (props: IButtonIconProps) => {
  return (
    <TouchableOpacity style={{ paddingHorizontal: spacings.base }} onPress={props.onPress}>
      <Icon name={props.name} size={24} color={sharedColors.grey500} />
    </TouchableOpacity>
  );
};
