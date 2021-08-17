import * as React from "react";
import { View, StyleProp, ViewStyle, TouchableOpacity, Text } from "react-native";
import { colors, fonts, shared, spacings } from "../common";
import Icon from "react-native-vector-icons/Ionicons";

export interface ModalHeaderProps {
  title: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ModalHeader = (props: ModalHeaderProps) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          borderBottomWidth: 1,
          borderColor: colors.grey200,
          alignItems: "center",
          height: 60,
        },
        props.style,
      ]}>
      <View style={{ width: 50 }}>
        {props.showCloseButton && (
          <TouchableOpacity
            style={{
              paddingVertical: spacings.small,
              alignItems: "center",
            }}
            onPress={props.onClose}>
            <Icon name={"close"} color={colors.primary} size={24} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: spacings.xsmall,
          alignItems: "center",
        }}>
        <Text style={[fonts.large, { fontWeight: "600" }]}>{props.title}</Text>
      </View>
      <View style={{ width: 50 }}></View>
    </View>
  );
};
