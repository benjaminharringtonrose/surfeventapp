import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, User } from "../common/models";
import { useAppDispatch, useAppSelector } from "./redux";
import { setUserRequest } from "../store/slices/userSlice";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const dispatch = useAppDispatch();
  const uid = useAppSelector(state => state.auth.user?.uid);
  useEffect(() => {
    if (!uid) {
      return;
    }
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.users)
      .doc(uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          const user = doc.data() as User;
          console.log(doc.data());
          setUser(user);
          dispatch(setUserRequest({ user }));
        }
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return user;
};
