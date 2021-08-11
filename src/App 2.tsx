import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { AppNavigator } from "./AppNavigator";

const App = () => {
  return <Root />;
};

const Root = () => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
