import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, Heat, User } from "../common/models";
import { useAppSelector } from "./redux";

export const usePendingAdminIds = (organizationId?: string) => {
  const [userIdList, setUserIdList] = useState<string[] | undefined>(undefined);

  console.log("organizationId", organizationId);

  useEffect(() => {
    if (!organizationId) {
      return;
    }
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.users)
      .where("isUserRolePending", "==", true)
      .where("isAdmin", "==", true)
      .where("organizationId", "==", organizationId)
      .onSnapshot(querySnapshot => {
        const uidList: string[] = [];
        querySnapshot?.forEach(doc => {
          const data = doc.data() as User;
          uidList.push(data.uid);
        });
        setUserIdList(uidList);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return userIdList;
};
