import firestore from "@react-native-firebase/firestore";
import { Middleware } from "@reduxjs/toolkit";
import { Collection, FirebaseUser, User } from "../common";
import { RootState } from "../store";
import { errorGetCurrentUser, loadingGetCurrentUser, updateUser } from "../store/slices/userSlice";

let isListeningToUser = false;
let unsubscribe: () => void | undefined;

export const userListener: Middleware<{}, RootState> = store => next => action => {
  const result = next(action);
  console.log(result);
  const stateAfter = store.getState();
  const userId = stateAfter.auth.user?.uid;
  if (userId && !isListeningToUser) {
    isListeningToUser = true;
    store.dispatch(loadingGetCurrentUser());
    unsubscribe = firestore()
      .collection(Collection.users)
      .doc(userId)
      .onSnapshot(
        doc => {
          const firebaseUser = doc.data() as FirebaseUser;
          const user = {
            ...firebaseUser,
            createdOn: firebaseUser?.createdOn?.toDate().toISOString(),
            birthdate: firebaseUser?.birthdate?.toDate().toISOString(),
          } as User;
          store.dispatch(updateUser({ user }));
        },
        error => {
          store.dispatch(
            errorGetCurrentUser({
              error: {
                ...error,
                message: "Error getting user",
                code:
                  error.stack +
                  `firestore()
                  .collection("users")
                  .doc(${userId})`,
              },
            }),
          );
        },
      );
  } else if (!userId && isListeningToUser) {
    isListeningToUser = false;
    unsubscribe();
  }
  return result;
};
