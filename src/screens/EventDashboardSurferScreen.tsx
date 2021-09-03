import React, { useRef } from "react";
import firestore from "@react-native-firebase/firestore";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import { EventNavProp } from "../AppNavigator";
import { colors, fonts, shared, spacings, User } from "../common";
import { UserInfoCompletionList } from "../components/UserCompletionList";
import { userHasCompletedProfile, userHasCompletedUserRole } from "../util";
import { UserRoleModal } from "../modals/UserRoleModal";
import { Event } from "../common/models";
import { AlertCard } from "../components/AlertCard";
import { EventButton } from "../components/EventButton";
import moment from "moment";

interface EventDashboardSurferProps {
  user: User;
  events?: Event[];
  navigation: EventNavProp;
}

export const EventDashboardSurferScreen = (props: EventDashboardSurferProps) => {
  const modalRef = useRef<Modalize>();

  const hasCompletedProfile = userHasCompletedProfile(props.user);
  const hasCompletedUserRole = userHasCompletedUserRole(props.user);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      {(!hasCompletedProfile || !hasCompletedUserRole) && (
        <UserInfoCompletionList
          items={[
            {
              label: "User Profile",
              onPress: () => props.navigation.navigate("ProfileEdit"),
              completed: hasCompletedProfile,
            },
            {
              label: "User Role",
              onPress: () => modalRef.current?.open(),
              completed: hasCompletedUserRole,
            },
          ]}
          style={{
            marginTop: spacings.base,
            marginHorizontal: spacings.base,
          }}
        />
      )}
      {hasCompletedProfile && hasCompletedUserRole && (
        <FlatList
          data={props.events}
          keyExtractor={item => item.eventId}
          ListHeaderComponent={
            <>
              {props.user.state === "pending" && props.user.isAdmin && (
                <AlertCard
                  title={"Your administration request is being processed"}
                  description={
                    "Once your admin access is approved, other organization members can see the events you've added."
                  }
                />
              )}
              <View style={{ marginLeft: spacings.base, marginVertical: spacings.base }}>
                <Text style={[fonts.header]}>{"Event Dashboard"}</Text>
              </View>
              <View style={{ padding: spacings.base }}>
                <Text style={{ color: colors.almostWhite, fontSize: 21 }}>
                  {"Upcoming Competitions"}
                </Text>
              </View>
            </>
          }
          renderItem={({ item }: { item: Event }) => {
            return (
              <EventButton
                eventName={item.eventName}
                dateStart={moment(item.dateStart.toDate()).format("MMM DD")}
                dateEnd={moment(item.dateEnd.toDate()).format("DD")}
                onPress={() => props.navigation.navigate("EventDetail", { eventId: item.eventId })}
              />
            );
          }}
          ListFooterComponent={
            <View style={styles.card}>
              {!props.events?.length && (
                <Text style={styles.cardText}>{"There are no upcoming competitions"}</Text>
              )}
            </View>
          }
        />
      )}
      <UserRoleModal ref={modalRef} user={props.user} onClose={() => modalRef.current?.close()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    ...shared.card,
    ...shared.shadow,
    marginBottom: spacings.base,
    marginHorizontal: spacings.base,
  },
  cardText: {
    ...fonts.large,
    color: colors.grey700,
    textAlign: "center",
    padding: spacings.base,
  },
});
