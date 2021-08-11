import * as React from "react";
import { Text } from "react-native";
import { colors, fonts, spacings } from "../styles";
import { Input, InputProps } from "./Input";

export interface FormInputProps extends InputProps {
  error?: string;
  touched?: boolean;
}
export const FormInput = (props: FormInputProps) => (
  <>
    <Input {...props} />
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
