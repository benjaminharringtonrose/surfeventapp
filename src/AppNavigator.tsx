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
import { EventDetailScreen } from "./screens/EventDetailScreen";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import { HeatAddScreen } from "./screens/HeatAddScreen";
import { HeatEditScreen } from "./screens/HeatEditScreen";

const defaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.greyscale9,
    shadowColor: "transparent",
  },
  headerTitleStyle: fonts.navHeader,
  cardStyle: { backgroundColor: "transparent" },
};

export type RootStackParamList = {
  MainStack: NavigatorScreenParams<MainStackParamList>;
  AddHeat: {
    eventId: string;
  };
  EditHeat: {
    eventId: string;
    heatId: string;
  };
};

export type RootStackNavProp = StackNavigationProp<RootStackParamList>;

export function RootStack() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
      <Stack.Screen name={"MainStack"} component={MainStack} options={{ headerShown: false }} />
      <Stack.Screen
        name={"AddHeat"}
        component={HeatAddScreen}
        options={{
          ...defaultNavigationOptions,
          title: "SurfEvent",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={"EditHeat"}
        component={HeatEditScreen}
        options={{
          ...defaultNavigationOptions,
          title: "SurfEvent",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

type MainStackParamList = {
  EventStack: NavigatorScreenParams<EventStackParamList>;
  HeatStack: NavigatorScreenParams<HeatStackParamList>;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
};

export type EventStackNavProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, "EventStack">,
  StackNavigationProp<RootStackParamList>
>;
export type HeatStackNavProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, "HeatStack">,
  StackNavigationProp<RootStackParamList>
>;
export type SettingsStackNavProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, "SettingsStack">,
  StackNavigationProp<RootStackParamList>
>;

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
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.white,
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

export type EventStackParamList = {
  Events: {
    showAlert?: boolean;
  };
  EventDetails: {
    eventId: string;
  };
};

export type EventNavProp = CompositeNavigationProp<
  StackNavigationProp<EventStackParamList>,
  EventStackNavProp
>;

export type EventsRouteProp = RouteProp<EventStackParamList, "Events">;

export type EventDetailsNavProp = CompositeNavigationProp<
  StackNavigationProp<EventStackParamList, "EventDetails">,
  EventStackNavProp
>;
export type EventDetailsRouteProp = RouteProp<EventStackParamList, "EventDetails">;

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
      <Stack.Screen
        name="EventDetails"
        component={EventDetailScreen}
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
