import * as React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacityProps,
  View,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, fonts, shared, spacings } from "../styles";

export interface ButtonProps extends TouchableOpacityProps {
  type?: "contained" | "bordered" | "text";
  label: string;
  loading?: boolean;
  disabled?: boolean;
  prefixIcon?: string;
  postfixIcon?: string;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = (props: ButtonProps) => {
  const { type = "contained", textColor } = props;
  const contentColor = textColor ? textColor : type === "contained" ? "white" : colors.primary;
  return (
    <TouchableOpacity
      {...props}
      disabled={props.loading || props.disabled}
      style={[
        {
          backgroundColor: type === "contained" ? colors.primary : undefined,
          paddingHorizontal: type !== "text" ? spacings.small : 0,
          paddingVertical: spacings.xsmall,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 45,
          borderRadius: shared.borderRadius,
          opacity: props.disabled || props.loading ? 0.5 : 1.0,
          borderColor: colors.primary,
          borderWidth: type === "bordered" ? 1 : 0,
        },
        props.style,
      ]}>
      {props.loading ? (
        <ActivityIndicator color={type === "contained" ? colors.grey200 : colors.grey800} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {!!props.prefixIcon && (
            <Icon
              name={props.prefixIcon}
              size={20}
              color={contentColor}
              style={{ marginRight: spacings.small }}
            />
          )}
          <Text
            style={[
              fonts.regular,
              {
                color: contentColor,
                fontWeight: "600",
              },
              props.textStyle,
            ]}>
            {props.label}
          </Text>
          {!!props.postfixIcon && (
            <Icon
              name={props.postfixIcon}
              size={20}
              color={contentColor}
              style={{ marginLeft: spacings.small }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
