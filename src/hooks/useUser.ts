import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, FirebaseUser, User } from "../common/models";
import { useAppDispatch, useAppSelector } from "./redux";
import { updateUser } from "../store/slices/userSlice";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [userError, setUserError] = useState<Error | undefined>(undefined);

  const dispatch = useAppDispatch();
  const uid = useAppSelector(state => state.auth.user?.uid);

  console.log("useUser ::: uid ", uid);

  useEffect(() => {
    if (!uid) {
      return;
    }
    setLoadingUser(true);
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.users)
      .doc(uid)
      .onSnapshot(
        doc => {
          if (doc !== null) {
            const firebaseUser = doc.data() as FirebaseUser;
            const user = {
              ...firebaseUser,
              createdOn: firebaseUser?.createdOn?.toDate().toISOString(),
              birthdate: firebaseUser?.birthdate?.toDate().toISOString(),
            } as User;
            console.log("user: ", user);
            setUser(user);
            dispatch(updateUser({ user }));
            setLoadingUser(false);
          }
        },
        (error: Error) => {
          setUserError(error);
          setLoadingUser(false);
        },
        () => {
          setLoadingUser(false);
        },
      );
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return { user, loadingUser, userError };
};
