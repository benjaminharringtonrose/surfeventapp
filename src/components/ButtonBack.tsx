import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { sharedColors, spacings } from "../common";
import { useColors } from "../hooks/useColors";

interface ButtonBackProps {
  onPress?: () => void;
}

export const ButtonBack = (props: ButtonBackProps) => {
  const colors = useColors();
  return (
    <TouchableOpacity onPress={props.onPress} style={{ paddingHorizontal: spacings.base }}>
      <Icon name={"chevron-back"} color={colors.icon} size={24} />
    </TouchableOpacity>
  );
};
