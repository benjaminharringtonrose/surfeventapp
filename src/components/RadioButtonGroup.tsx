import React, { useState } from "react";
import { View } from "react-native";
import { colors, spacings } from "../common";
import { IRadioButtonOption, RadioButton } from "./RadioButton";

interface IRadioButtonGroup {
  options: IRadioButtonOption[];
}

export const RadioButtonGroup = ({ options }: IRadioButtonGroup) => {
  const [radioOptions, setRadioOptions] = useState<IRadioButtonOption[]>(options);

  const onRadioPress = (item: IRadioButtonOption) => {
    let updatedState = options.map(option =>
      option.id === item.id ? { ...option, selected: true } : { ...option, selected: false },
    );
    setRadioOptions(updatedState);
  };
  return (
    <View>
      {radioOptions.map(radioOption => (
        <RadioButton
          onPress={() => onRadioPress(radioOption)}
          selected={radioOption.selected}
          key={radioOption.id}
          label={radioOption.label}
          labelStyle={{ color: colors.almostWhite }}
          style={{ marginBottom: spacings.small, marginRight: spacings.base }}
        />
      ))}
    </View>
  );
};
