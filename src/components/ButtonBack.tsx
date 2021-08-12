import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, spacings } from "../common";

interface ButtonBackProps {
  onPress?: () => void;
}

export const ButtonBack = (props: ButtonBackProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ paddingHorizontal: spacings.base }}>
      <Icon name={"chevron-back"} color={colors.yellowCream} size={34} />
    </TouchableOpacity>
  );
};
