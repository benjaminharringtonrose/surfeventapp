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
  isAdmin?: boolean;
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
  organizationId?: string;
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
  users = "users",
  mail = "mail",
  messages = "messages",
  waves = "waves",
  organizations = "organizations",
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

export interface User {
  uid: string;
  firstName?: string;
  lastName?: string;
  email: string;
  timestamp: number;
  chatRooms?: string[];
  surfHeats?: string[];
  surfEvents?: string[];
  providers?: string[];
  messagingTokens?: string[];
  isAdmin?: boolean;
}

export interface Wave {
  waveId: string;
  score: number;
  time: FirebaseFirestoreTypes.Timestamp;
  disqualified: boolean;
}

export type Division = ListPickerItem | string;

export interface FirebaseScore {
  key: string;
  surfer: string;
  color: string;
  waves: IStringMap<Wave>;
  total?: number;
}

export interface FirebaseHeat {
  title: string | undefined;
  eventId: string;
  heatId: string;
  uid: string;
  division?: (ListPickerItem & Division) | undefined;
  heatType: HeatType;
  scores: IStringMap<FirebaseScore>;
  dateStart: FirebaseFirestoreTypes.Timestamp;
  timeStart: FirebaseFirestoreTypes.Timestamp;
}

export interface Score {
  key: string;
  surfer: string;
  color: string;
  waves: Wave[];
  total?: number;
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

export interface Organization {
  organizationId: string;
  name: string;
  acronym: string;
}
