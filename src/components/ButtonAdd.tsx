import React from "react";
import { Dimensions, TouchableOpacity, View, Text, StyleProp, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, shared, spacings } from "../common";

interface ButtonAddProps {
  label?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ButtonAdd = (props: ButtonAddProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[shared.card, shared.shadow, { marginVertical: spacings.base }, props?.style]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: spacings.small,
          paddingVertical: spacings.xsmall,
        }}>
        {!!props?.label && (
          <Text style={{ color: colors.grey500, fontSize: 21, paddingRight: spacings.small }}>
            {props.label}
          </Text>
        )}
        <Icon name={"add"} size={28} color={colors.grey500} />
      </View>
    </TouchableOpacity>
  );
};