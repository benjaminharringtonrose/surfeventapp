import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import { EventDashboardScreen } from "./screens/EventDashboardScreen";
import { HeatDashboardScreen } from "./screens/HeatDashboardScreen";
import { SettingsDashboardScreen } from "./screens/SettingsDashboardScreen";
import { AuthSignUpScreen } from "./screens/AuthSignUpScreen";
import { AuthLoginScreen } from "./screens/AuthLoginScreen";
import { colors, fonts } from "./common";

type MainStackParamList = {
  EventStack: undefined;
  HeatStack: undefined;
  SettingsStack: undefined;
};

export type EventStackNavProp = StackNavigationProp<MainStackParamList, "EventStack">;
export type HeatStackNavProp = StackNavigationProp<MainStackParamList, "HeatStack">;
export type SettingsStackNavProp = StackNavigationProp<MainStackParamList, "SettingsStack">;

export function MainStack() {
  const Tab = createBottomTabNavigator<MainStackParamList>();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "EventStack") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "HeatStack") {
            iconName = focused ? "calculator" : "calculator-outline";
          } else if (route.name === "SettingsStack") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          shadowColor: "transparent",
          borderTopWidth: 0,
        },
        tabBarLabel: "",
        tabBarActiveTintColor: colors.yellowCream,
        tabBarInactiveTintColor: colors.grey700,
      })}>
      <Tab.Screen name="EventStack" component={EventStack} options={{ headerShown: false }} />
      <Tab.Screen name="HeatStack" component={HeatStack} options={{ headerShown: false }} />
      <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type LoginNavProp = StackNavigationProp<AuthStackParamList, "Login">;
export type SignUpNavProp = StackNavigationProp<AuthStackParamList, "SignUp">;

const defaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.background,
    shadowColor: "transparent",
  },
  headerTitleStyle: [fonts.title3, { color: colors.yellowCream }],
  cardStyle: { backgroundColor: "transparent" },
};

export function AuthStack() {
  const Stack = createStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={AuthLoginScreen}
        options={{
          title: "SurfEvent",
          ...defaultNavigationOptions,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={AuthSignUpScreen}
        options={{
          title: "SurfEvent",
          ...defaultNavigationOptions,
        }}
      />
    </Stack.Navigator>
  );
}

type EventStackParamList = {
  Events: undefined;
};

export type EventNavProp = StackNavigationProp<EventStackParamList, "Events">;

export function EventStack() {
  const Stack = createStackNavigator<EventStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        component={EventDashboardScreen}
        options={{
          title: "SurfEvent",
          ...defaultNavigationOptions,
        }}
      />
    </Stack.Navigator>
  );
}

type HeatStackParamList = {
  Heat: undefined;
};

export type HeatNavProp = StackNavigationProp<HeatStackParamList, "Heat">;

export function HeatStack() {
  const Stack = createStackNavigator<HeatStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Heat"
        component={HeatDashboardScreen}
        options={{
          title: "SurfEvent",
          ...defaultNavigationOptions,
        }}
      />
    </Stack.Navigator>
  );
}

type SettingsStackParamList = {
  Settings: undefined;
};

export type SettingsNavProp = StackNavigationProp<SettingsStackParamList, "Settings">;

export function SettingsStack() {
  const Stack = createStackNavigator<SettingsStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsDashboardScreen}
        options={{
          title: "SurfEvent",
          ...defaultNavigationOptions,
        }}
      />
    </Stack.Navigator>
  );
}
