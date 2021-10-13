import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { spacings } from "../common";
import { useColors } from "../hooks/useColors";

interface ButtonXProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ButtonX = (props: ButtonXProps) => {
  const colors = useColors();
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon name={"close"} color={colors.icon} size={24} />
    </TouchableOpacity>
  );
};
