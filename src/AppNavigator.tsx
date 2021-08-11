import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import { EventDashboardScreen } from "./screens/EventDashboardScreen";
import { JudgeDashboardScreen } from "./screens/JudgeDashboardScreen";
import { SettingsDashboardScreen } from "./screens/SettingsDashboardScreen";
import { AuthSignUpScreen } from "./screens/AuthSignUpScreen";
import { AuthLoginScreen } from "./screens/AuthLoginScreen";

export function AppNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      {/* {true ? (
        // "user signed in?"
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{
            headerShown: false,
          }}
        />
      ) : ( */}
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{
          headerShown: false,
        }}
      />
      {/* )} */}
    </Stack.Navigator>
  );
}

function MainNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "Events") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Judge") {
            iconName = focused ? "calculator" : "calculator-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Events" component={EventDashboardScreen} />
      <Tab.Screen name="Judge" component={JudgeDashboardScreen} />
      <Tab.Screen name="Settings" component={SettingsDashboardScreen} />
    </Tab.Navigator>
  );
}

export function AuthNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={AuthLoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={AuthSignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
