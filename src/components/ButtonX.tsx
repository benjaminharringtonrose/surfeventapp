import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, spacings } from "../common";

interface ButtonXProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ButtonX = (props: ButtonXProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon name={"close"} color={colors.almostWhite} size={24} />
    </TouchableOpacity>
  );
};
