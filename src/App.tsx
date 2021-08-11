import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { AppNavigator } from "./AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
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
