import firestore from "@react-native-firebase/firestore";
import { Middleware } from "@reduxjs/toolkit";
import { Collection, User } from "../common";
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
          const updatedUser = doc.data() as User;
          store.dispatch(updateUser({ user: updatedUser }));
        },
        error => {
          store.dispatch(
            errorGetCurrentUser({
              error: {
                ...error,
                message: "Error getting user",
                stack:
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
