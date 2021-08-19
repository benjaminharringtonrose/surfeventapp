import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { AuthStack, MainStack } from "./AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store";
import auth from "@react-native-firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "./common";
import { Host } from "react-native-portalize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppDispatch } from "./hooks/redux";
import { setAuthUser } from "./store/slices/authSlice";

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Root />
      </Provider>
    </SafeAreaProvider>
  );
};

const Root = () => {
  const isDarkMode = useColorScheme() === "dark";
  const Stack = createStackNavigator();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    if (user) {
      dispatch(setAuthUser({ user: user._user }));
    }
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  if (initializing) return null;

  return (
    <Host>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.background } }}>
          {user ? (
            <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Host>
  );
};

export default App;
