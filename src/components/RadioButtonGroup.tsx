import React, { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { colors, spacings } from "../common";
import { IRadioButtonOption, RadioButton } from "./RadioButton";

interface IRadioButtonGroup {
  options: IRadioButtonOption[];
  onPress: (options: IRadioButtonOption[]) => void;
  style?: StyleProp<ViewStyle>;
}

export const RadioButtonGroup = ({ options, onPress, style }: IRadioButtonGroup) => {
  const [radioOptions, setRadioOptions] = useState<IRadioButtonOption[]>(options);

  const onRadioPress = (item: IRadioButtonOption) => {
    let updatedState = options.map(option =>
      option.id === item.id ? { ...option, selected: true } : { ...option, selected: false },
    );
    onPress(updatedState);
    setRadioOptions(updatedState);
  };
  return (
    <View style={style}>
      {radioOptions.map(radioOption => (
        <RadioButton
          onPress={() => onRadioPress(radioOption)}
          selected={radioOption.selected}
          key={radioOption.id}
          label={radioOption.label}
          labelStyle={{ color: colors.almostWhite }}
          style={{ marginBottom: spacings.base, marginRight: spacings.base }}
        />
      ))}
    </View>
  );
};
