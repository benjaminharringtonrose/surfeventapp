import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, spacings } from "../common";

interface ButtonXProps {
  onPress?: () => void;
}

export const ButtonX = (props: ButtonXProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ paddingHorizontal: spacings.base }}>
      <Icon name={"close"} color={colors.almostWhite} size={24} />
    </TouchableOpacity>
  );
};
