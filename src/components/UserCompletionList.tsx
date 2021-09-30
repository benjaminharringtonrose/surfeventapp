import * as React from "react";
import { StyleProp, ViewStyle, Text } from "react-native";
import { fonts, spacings } from "../common";
import { useColors } from "../hooks/useColors";
import { CompletionListCard, CompletionListCardItem } from "./CompletionListCard";

export interface UserInfoCompletionListProps {
  items: CompletionListCardItem[];
  style?: StyleProp<ViewStyle>;
}

export const UserInfoCompletionList = (props: UserInfoCompletionListProps) => {
  const colors = useColors();
  return (
    <CompletionListCard style={props.style} items={props.items}>
      <>
        <Text style={[fonts.header, { color: colors.primary }]}>{"Welcome!"}</Text>
        <Text style={[fonts.regular, { marginTop: spacings.small }]}>
          {
            "We need a bit of information about you before we can start. You'll be accessing your surf heats in no time!"
          }
        </Text>
      </>
    </CompletionListCard>
  );
};
