import React, { useState } from "react";
import { Text, View } from "react-native";
import DatePicker from "react-native-date-picker";

import { colors, fonts, shared, spacings } from "../common";

interface FormDatePickerProps {
  label: string;
  value?: Date;
  onSelectDate: (date: Date) => void;
  error?: string;
  touched?: boolean;
}

export const FormDatePicker = (props: FormDatePickerProps) => {
  const [date, setDate] = useState(props.value || new Date());

  return (
    <>
      <View
        style={{
          marginTop: spacings.base,
          borderWidth: 1,
          borderRadius: shared.borderRadius,
          borderColor: colors.grey500,
        }}>
        <Text
          style={[
            fonts.small,
            {
              marginLeft: spacings.small,
              paddingTop: spacings.xsmall,
              fontWeight: "700",
              color: colors.grey700,
              textAlign: "left",
            },
          ]}>
          {props.label}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <DatePicker
            date={date}
            onDateChange={date => {
              props.onSelectDate(date);
              setDate(date);
            }}
            mode={"date"}
          />
        </View>
      </View>
      {!!props.error && !!props.touched && (
        <Text
          style={[
            fonts.regular,
            {
              marginTop: spacings.xsmall,
              marginLeft: spacings.small,
              color: colors.error,
            },
          ]}>
          {props.error}
        </Text>
      )}
    </>
  );
};
