import * as React from "react";
import { StyleProp, ViewStyle, Text } from "react-native";
import { colors, fonts, spacings } from "../common";
import { useAppSelector } from "../hooks/redux";
import { userHasCompletedProfile } from "../util";
import { CompletionListCard, CompletionListCardItem } from "./CompletionListCard";

export interface UserInfoCompletionListProps {
  items: CompletionListCardItem[];
  onProfile: () => void;
  onVerification: () => void;
  style?: StyleProp<ViewStyle>;
}

export const UserInfoCompletionList = (props: UserInfoCompletionListProps) => {
  const { user } = useAppSelector(state => state.user);

  if (!user) {
    return null;
  }

  const completedProfile = userHasCompletedProfile(user);
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
