import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { ListPickerItem } from "../components/ListPicker";

export interface IStringMap<T> {
  [x: string]: T;
}

export interface AuthUser {
  emailVerified?: boolean;
  uid: string;
  providerId?: string;
  providerData: Array<any>;
  displayName?: string;
  email?: string;
  isAnonymous?: boolean;
  photoURL?: string;
  metadata: { creationTime?: string; lastSignInTime?: string };
}

export interface User {
  uid: string;
  email: string;
  timestamp: number;
  chatRooms?: string[];
  surfHeats?: string[];
  surfEvents?: string[];
  providers?: string[];
  messagingTokens?: string[];
}

export interface Mail {
  to: string[];
  message: {
    subject: string;
    text: string;
    html?: string;
  };
}

export enum Collection {
  events = "events",
  heats = "heats",
  user = "user",
  mail = "mail",
  messages = "messages",
  waves = "waves",
}

export enum ESA_DIVISIONS {
  BOYSU12 = "BOYSU12",
  BOYSU14 = "BOYSU14",
  BOYSU16 = "BOYSU16",
  JMENU18 = "JMENU18",
  MEN = "MEN",
  GIRLSU12 = "GIRLSU12",
  GIRLSU14 = "GIRLSU14",
  GIRLSU16 = "GIRLSU16",
  JWOMENU18 = "JWOMENU18",
  WOMEN = "WOMEN",
  LADIES = "LADIES",
  MASTERS = "MASTERS",
  SMEN = "SMEN",
  LEGENDS = "LEGENDS",
  GLEGENDS = "GLEGENDS",
}

export enum HeatType {
  regular = "regular",
  quarterFinal = "quarterFinal",
  semiFinal = "semiFinal",
  final = "final",
}

export type Division = ListPickerItem | string;

export interface Score {
  key: string;
  surfer: string;
  color: string;
  waves: number[];
  total: number;
}

export interface Heat {
  title: string | undefined;
  eventId: string;
  heatId: string;
  uid: string;
  division?: (ListPickerItem & Division) | undefined;
  heatType: HeatType;
  scores: IStringMap<Score>;
  dateStart: FirebaseFirestoreTypes.Timestamp;
  timeStart: FirebaseFirestoreTypes.Timestamp;
}

export interface Event {
  uid: string;
  eventId: string;
  eventName: string;
  timeStart: FirebaseFirestoreTypes.Timestamp;
  dateStart: FirebaseFirestoreTypes.Timestamp;
  dateEnd: FirebaseFirestoreTypes.Timestamp;
}

export interface Wave {
  heatId: string;
  waveId: string;
  surfer: string;
  score: number;
}
