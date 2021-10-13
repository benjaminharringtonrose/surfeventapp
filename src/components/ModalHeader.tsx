import * as React from "react";
import { View, StyleProp, ViewStyle, TouchableOpacity, Text } from "react-native";
import { fonts, shared, spacings } from "../common";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationTextButton } from "./NavigationTextButton";
import { useColors } from "../hooks/useColors";

export interface ModalHeaderProps {
  title: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  showDoneButton?: boolean;
  onDone?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ModalHeader = (props: ModalHeaderProps) => {
  const colors = useColors();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.greyscale9,
          borderTopLeftRadius: shared.borderRadius,
          borderTopRightRadius: shared.borderRadius,
        },
        props.style,
      ]}>
      <View
        style={{
          width: 100,
        }}>
        {props.showCloseButton && (
          <TouchableOpacity
            style={{
              paddingVertical: spacings.small,
              alignItems: "center",
            }}
            onPress={props.onClose}>
            <Icon name={"close"} color={colors.icon} size={24} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: spacings.xsmall,
          alignItems: "center",
        }}>
        <Text style={[fonts.large, { fontWeight: "600", color: colors.almostWhite }]}>
          {props.title}
        </Text>
      </View>
      <View
        style={{
          width: 100,
          alignItems: "center",
          justifyContent: "center",
        }}>
        {props.showDoneButton && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <NavigationTextButton label={"Done"} onPress={props.onDone} />
          </View>
        )}
      </View>
    </View>
  );
};
