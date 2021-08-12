import * as functions from "firebase-functions";
import { User } from "../common/models";
import * as firebase from "firebase-admin";
import { format } from "date-fns";
firebase.firestore().settings({ ignoreUndefinedProperties: true });

export const onUserCreate = functions.auth.user().onCreate(async user => {
  if (!user.uid || !user.email || !user.displayName || !user.providerData) {
    return;
  }
  const userRecord: Partial<User> = {
    uid: user.uid,
    email: user.email,
    firstName: user.displayName?.split(" ")?.[0],
    lastName: user.displayName?.split(" ")?.[1],
    providers: user.providerData?.map(provider => provider.providerId),
    createdOn: format(new Date(), "YYYY-MM-DD"),
  };
  await firebase.firestore().collection("users").doc(userRecord.uid!).set(userRecord);
});
