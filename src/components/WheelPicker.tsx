import React, { useState } from "react";
import { View, Text } from "react-native";

import Picker from "@gregfrench/react-native-wheel-picker";
import { colors } from "../common";

interface WheelPickerProps {
  list: any[];
  value: any;
  onValueChange: (index: any) => void;
}

var PickerItem = Picker.Item;

const WheelPicker = (props: WheelPickerProps) => {
  return (
    <View>
      <Text>
        <Picker
          style={{ width: 150, height: 200 }}
          lineColor="#000000" //to set top and bottom line color (Without gradients)
          lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
          lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
          selectedValue={props.value}
          itemStyle={{ color: colors.almostWhite, fontSize: 26 }}
          onValueChange={props.onValueChange}>
          {props.list.map((number, i) => (
            <PickerItem label={number.toString()} value={i} key={i} />
          ))}
        </Picker>
      </Text>
    </View>
  );
};

export default WheelPicker;
