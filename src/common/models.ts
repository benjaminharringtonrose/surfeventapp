import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { ListPickerItem } from "../components/ListPicker";

export interface IStringMap<T> {
  [x: string]: T;
}

export interface IError {
  code?: string;
  message?: string;
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

export interface FirebaseUser {
  uid: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  gender?: Gender;
  birthdate?: FirebaseFirestoreTypes.Timestamp;
  email: string;
  createdOn?: FirebaseFirestoreTypes.Timestamp;
  chatRooms?: string[];
  providers?: string[];
  messagingTokens?: string[];
  organizationId?: string;
  isAdmin: boolean;
  state: "approved" | "pending" | "rejected";
}

export interface User {
  uid: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  gender?: Gender;
  birthdate?: string;
  email: string;
  createdOn: string;
  chatRooms?: string[];
  providers?: string[];
  messagingTokens?: string[];
  organizationId?: string;
  isAdmin: boolean;
  state: "approved" | "pending" | "rejected";
}

export interface Mail {
  to: string[];
  message: {
    subject: string;
    text: string;
    html?: string;
  };
}

export enum Errors {
  generic = "An error occurred. Check your network connection or try again later.",
  noPhotoPermission = "You must give SurfEvent to access your camera or photo library to upload photos. Please grant access in your Settings app, then try again.",
  unknown = "unknown",
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export enum Collection {
  events = "events",
  heats = "heats",
  users = "users",
  mail = "mail",
  messages = "messages",
  waves = "waves",
  organizations = "organizations",
  adminRequests = "adminRequests",
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
  email: string;
}

export interface AdminRequest {
  adminRequestId: string;
  organizationId: string;
  uid: string;
}
