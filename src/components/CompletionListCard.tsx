import * as React from "react";
import { View, ViewProps, Text, TouchableOpacity } from "react-native";
import { fonts, shared, spacings } from "../common";
import { Icon } from ".";
import { useColors } from "../hooks/useColors";

export interface CompletionListCardItem {
  onPress: () => void;
  label: string;
  completed?: boolean;
  disabled?: boolean;
}

export interface CompletionListCardProps extends React.PropsWithChildren<ViewProps> {
  items: CompletionListCardItem[];
}

export const CompletionListCard = (props: CompletionListCardProps) => {
  return (
    <View style={[shared.card, shared.shadow, props.style]}>
      <View style={{ margin: spacings.base }}>{props.children}</View>

      {props.items.map((item, index) => (
        <InfoCompletionCell
          key={"infocompletioncell" + index}
          label={item.label}
          completed={!!item.completed}
          disabled={!!item.disabled}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};

const InfoCompletionCell = (props: {
  label: string;
  disabled?: boolean;
  completed: boolean;
  onPress: () => void;
}) => {
  const colors = useColors();
  return (
    <View style={{ borderTopColor: colors.grey500, borderTopWidth: 1 }}>
      <TouchableOpacity
        style={{
          minHeight: 60,
          flexDirection: "row",
          opacity: props.disabled ? 0.5 : 1,
        }}
        disabled={props.disabled}
        onPress={props.onPress}>
        <View
          style={{
            marginLeft: spacings.base,
            flex: 1,
            justifyContent: "center",
          }}>
          <Text
            style={[
              fonts.regular,
              {
                fontWeight: "600",
                color: props.completed ? colors.success : colors.almostWhite,
              },
            ]}>
            {props.label}
          </Text>
        </View>
        <View
          style={{
            marginRight: spacings.base,
            alignItems: "center",
            justifyContent: "center",
          }}>
          {props.completed && <Icon name="checkmark-circle" size={26} color={colors.success} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};
