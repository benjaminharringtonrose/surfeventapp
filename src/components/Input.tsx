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
          opacity: 0.8,
          borderColor: colors.greyscale1,
          borderBottomWidth: 2,
        },
        props.style,
        ,
      ]}>
      {!!props.label && (
        <Text
          style={[
            fonts.small,
            {
              paddingTop: spacings.xsmall,
              fontWeight: "600",
              color: colors.grey200,
            },
          ]}>
          {props.label}
        </Text>
      )}
      <TextInput
        ref={ref}
        placeholderTextColor={colors.grey500}
        selectionColor={colors.grey200}
        autoCapitalize={"none"}
        {...props}
        style={[
          {
            marginTop: spacings.tiny,
            opacity: 0.8,
            minHeight: 40,
            paddingVertical: spacings.xsmall,
            borderRadius: shared.borderRadius,
            color: colors.white,
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
