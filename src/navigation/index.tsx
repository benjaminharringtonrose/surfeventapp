import React from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { fonts } from "../common";
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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColors } from "../hooks/useColors";

export {
  NavigationProps,
  RootStackParamList,
  AuthStackParamList,
  EventStackParamList,
  SettingsStackParamList,
};

export function AuthStack() {
  const colors = useColors();
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName={"Login"}
      screenOptions={{
        headerTitleStyle: fonts.navHeader,
        headerTransparent: true,
        headerTintColor: colors.icon,
        presentation: "card",
      }}>
      <Stack.Screen name="Login" component={AuthLoginScreen} />
      <Stack.Screen name="SignUp" component={AuthSignUpScreen} />
    </Stack.Navigator>
  );
}

export function RootStack() {
  const colors = useColors();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName={"DrawerStack"}
      screenOptions={{
        headerTitleStyle: fonts.navHeader,
        headerTransparent: true,
        headerTintColor: colors.icon,
        presentation: "modal",
      }}>
      <Stack.Screen name={"DrawerStack"} component={DrawerStack} options={{ headerShown: false }} />
      <Stack.Screen name={"AddHeat"} component={HeatAddScreen} />
      <Stack.Screen name={"EditHeat"} component={HeatEditScreen} />
      <Stack.Screen name={"HeatSheet"} component={HeatSheetScreen} />
    </Stack.Navigator>
  );
}

export function EventStack() {
  const colors = useColors();
  const Stack = createNativeStackNavigator<EventStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: fonts.navHeader,
        headerTransparent: true,
        headerTintColor: colors.icon,
        presentation: "card",
      }}>
      <Stack.Screen
        name="Events"
        component={EventDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
}

function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function DrawerStack() {
  const Drawer = createDrawerNavigator<DrawerStackParamList>();
  return (
    <Drawer.Navigator
      initialRouteName={"EventStack"}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="EventStack" component={EventStack} options={{ title: "Events" }} />
      <Drawer.Screen
        name="Settings"
        component={SettingsDashboardScreen}
        options={{ title: "Settings" }}
      />
    </Drawer.Navigator>
  );
}
