import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  EventStack: NavigatorScreenParams<EventStackParamList>;
  DrawerStack: NavigatorScreenParams<DrawerStackParamList>;
  AddHeat: {
    eventId: string;
  };
  EditHeat: {
    eventId: string;
    heatId: string;
  };
  HeatSheet: {
    title: string;
    eventId: string;
    heatId: string;
  };
};

export type DrawerStackParamList = {
  Settings: undefined;
  EventStack: NavigatorScreenParams<EventStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type EventStackParamList = {
  Events: {
    showAlert?: boolean;
  };
  EventDetail: {
    eventId: string;
  };
  ProfileEdit: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type NavigationProps = {
  AddHeat: {
    navigation: StackNavigationProp<RootStackParamList, "AddHeat">;
    route: RouteProp<RootStackParamList, "AddHeat">;
  };
  EditHeat: {
    navigation: StackNavigationProp<RootStackParamList, "EditHeat">;
    route: RouteProp<RootStackParamList, "EditHeat">;
  };
  EventDetail: {
    navigation: CompositeNavigationProp<
      StackNavigationProp<EventStackParamList, "EventDetail">,
      StackNavigationProp<RootStackParamList>
    >;
    route: RouteProp<EventStackParamList, "EventDetail">;
  };
  Events: {
    navigation: CompositeNavigationProp<
      StackNavigationProp<EventStackParamList, "Events">,
      CompositeNavigationProp<
        DrawerNavigationProp<DrawerStackParamList>,
        StackNavigationProp<RootStackParamList>
      >
    >;
    route: RouteProp<EventStackParamList, "Events">;
  };
  HeatSheet: {
    navigation: StackNavigationProp<RootStackParamList, "HeatSheet">;
    route: RouteProp<RootStackParamList, "HeatSheet">;
  };
  Login: {
    navigation: StackNavigationProp<AuthStackParamList, "Login">;
    route: RouteProp<AuthStackParamList, "Login">;
  };
  ProfileEdit: {
    navigation: CompositeNavigationProp<
      StackNavigationProp<EventStackParamList, "ProfileEdit">,
      StackNavigationProp<RootStackParamList>
    >;
    route: RouteProp<EventStackParamList, "ProfileEdit">;
  };
  Settings: {
    navigation: StackNavigationProp<SettingsStackParamList, "Settings">;
    route: RouteProp<SettingsStackParamList, "Settings">;
  };
  SignUp: {
    navigation: StackNavigationProp<AuthStackParamList, "SignUp">;
    route: RouteProp<AuthStackParamList, "SignUp">;
  };
};
