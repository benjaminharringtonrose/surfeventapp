import * as React from "react";
import {
  View,
  Text,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colors, fonts, shared, spacings } from "../common";

export interface InputProps extends TextInputProps {
  label?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  footnote?: string;
}
export const Input = React.forwardRef<TextInput, InputProps>((props: InputProps, ref) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.input,
          opacity: 0.8,
          borderRadius: shared.borderRadius,
          borderColor: colors.grey500,
        },
        ,
        props.style,
      ]}>
      {!!props.label && (
        <Text
          style={[
            fonts.small,
            {
              marginLeft: spacings.small,
              paddingTop: spacings.xsmall,
              fontWeight: "700",
              color: colors.grey800,
            },
          ]}>
          {props.label}
        </Text>
      )}
      <TextInput
        ref={ref}
        placeholderTextColor={colors.grey500}
        {...props}
        style={[
          {
            marginTop: spacings.tiny,
            backgroundColor: colors.input,
            opacity: 0.8,
            minHeight: 40,
            paddingVertical: spacings.xsmall,
            paddingHorizontal: spacings.small,
            borderRadius: shared.borderRadius,
          },
          fonts.regular,
          props.inputStyle,
        ]}
      />
      {!!props.footnote && (
        <Text
          style={[
            fonts.micro,
            {
              marginTop: spacings.xsmall,
              marginLeft: spacings.small,
            },
          ]}>
          {props.footnote}
        </Text>
      )}
    </View>
  );
});

export const EmailInput = React.forwardRef<TextInput, InputProps>((props: InputProps, ref) => (
  <Input
    ref={ref}
    placeholder={"Email"}
    textContentType="emailAddress"
    autoCompleteType="email"
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    {...props}
  />
));
