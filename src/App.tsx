import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import { Alert, StatusBar, useColorScheme, View } from "react-native";
import { AuthStack, RootStack } from "./AppNavigator";
import { Provider } from "react-redux";
import messaging from "@react-native-firebase/messaging";
import { store } from "./store";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthUser, colors } from "./common";
import { Host } from "react-native-portalize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppDispatch } from "./hooks/redux";
import { setAuthUser } from "./store/slices/authSlice";
import { updateMessagingToken } from "./util/cloudMessaging";
import { LogBox } from "react-native";
import Orientation from "react-native-orientation-locker";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { useUser } from "./hooks/useUser";

LogBox.ignoreLogs([
  "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
]);

const App = () => {
  useEffect(() => {
    PushNotificationIOS.addEventListener("notification", onRemoteNotification);
  });

  const onRemoteNotification = (notification: any) => {
    const isClicked = notification.getData().userInteraction === 1;
    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
  };

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
  const [user, setUser] = useState<AuthUser | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    Orientation.lockToPortrait();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async message => {
      const title = message.notification?.title || "";
      const body = message.notification?.body || "";
      Alert.alert(title, body);
    });
    return unsubscribe;
  }, []);

  const onAuthStateChanged = async (firebaseUser: FirebaseAuthTypes.User | null) => {
    try {
      let authUser: AuthUser | undefined = undefined;
      if (firebaseUser) {
        authUser = {
          emailVerified: firebaseUser.emailVerified,
          uid: firebaseUser.uid,
          providerId: firebaseUser.providerId,
          providerData: firebaseUser.providerData,
          displayName: firebaseUser.displayName || undefined,
          email: firebaseUser.email || undefined,
          isAnonymous: firebaseUser.isAnonymous,
          photoURL: firebaseUser.photoURL || undefined,
          metadata: firebaseUser.metadata,
        };
        dispatch(setAuthUser({ user: authUser }));
        await updateMessagingToken(firebaseUser.uid);
      }
      setUser(authUser);
      if (initializing) {
        setInitializing(false);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  if (initializing) return null;

  return (
    <Host>
      <NavigationContainer theme={isDarkMode ? DarkTheme : undefined}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.background },
            cardOverlay: () => (
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.background,
                }}
              />
            ),
          }}>
          {user ? (
            <Stack.Screen name="Root" component={RootStack} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{ headerShown: false, animationTypeForReplace: user ? "push" : "pop" }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Host>
  );
};

export default App;
