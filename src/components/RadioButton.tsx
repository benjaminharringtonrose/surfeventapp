import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { sharedColors } from "../common";

export interface IRadioButtonOption {
  id: string | number;
  label: string;
  selected: boolean;
}

interface IRadioButtonProps {
  onPress: () => void;
  selected: boolean;
  label: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const RadioButton = ({ onPress, selected, label, style, labelStyle }: IRadioButtonProps) => {
  return (
    <View style={[styles.radioButtonContainer, style]}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.radioButtonText, labelStyle]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: sharedColors.greyscale1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: sharedColors.greyscale1,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: sharedColors.primary,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
});
