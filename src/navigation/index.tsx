import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { colors, fonts } from "../common";
import { AuthLoginScreen } from "../screens/AuthLoginScreen";
import { AuthSignUpScreen } from "../screens/AuthSignUpScreen";
import { EventDashboardScreen } from "../screens/EventDashboardScreen";
import { SettingsDashboardScreen } from "../screens/SettingsDashboardScreen";
import { HeatAddScreen } from "../screens/HeatAddScreen";
import { HeatEditScreen } from "../screens/HeatEditScreen";
import { HeatSheetScreen } from "../screens/HeatSheetScreen";
import { ProfileEditScreen } from "../screens/ProfileEditScreen";
import { EventDetailScreen } from "../screens/EventDetailScreen";
import {
  AuthStackParamList,
  EventStackParamList,
  RootStackParamList,
  SettingsStackParamList,
  NavigationProps,
  DrawerStackParamList,
} from "./types";

export {
  NavigationProps,
  RootStackParamList,
  AuthStackParamList,
  EventStackParamList,
  SettingsStackParamList,
};

const defaultScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.greyscale9,
  },
  headerTitleStyle: fonts.navHeader,
  cardStyle: { backgroundColor: "transparent" },
};

export function AuthStack() {
  const Stack = createStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator initialRouteName={"Login"} screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Login" component={AuthLoginScreen} />
      <Stack.Screen name="SignUp" component={AuthSignUpScreen} />
    </Stack.Navigator>
  );
}

export function RootStack() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName={"DrawerStack"}
      screenOptions={{ ...defaultScreenOptions, presentation: "modal" }}>
      <Stack.Screen name={"EventStack"} component={EventStack} options={{ headerShown: false }} />
      <Stack.Screen name={"DrawerStack"} component={DrawerStack} options={{ headerShown: false }} />
      <Stack.Screen name={"AddHeat"} component={HeatAddScreen} />
      <Stack.Screen name={"EditHeat"} component={HeatEditScreen} />
      <Stack.Screen name={"HeatSheet"} component={HeatSheetScreen} />
    </Stack.Navigator>
  );
}

export function EventStack() {
  const Stack = createStackNavigator<EventStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ ...defaultScreenOptions }}>
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
}

function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert("Link to help")} />
    </DrawerContentScrollView>
  );
}

function DrawerStack() {
  const Drawer = createDrawerNavigator<DrawerStackParamList>();
  return (
    <Drawer.Navigator
      initialRouteName={"EventStack"}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Events" component={EventDashboardScreen} />
      <Drawer.Screen name="Settings" component={SettingsDashboardScreen} />
    </Drawer.Navigator>
  );
}
