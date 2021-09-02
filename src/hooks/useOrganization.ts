import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, Organization } from "../common/models";
import { useAppSelector } from "./redux";

export const useOrganization = (organizationId: string) => {
  const [organization, setOrganization] = useState<Organization | undefined>(undefined);
  const uid = useAppSelector(state => state.auth.user?.uid);

  useEffect(() => {
    if (!uid) {
      return;
    }
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.organizations)
      .doc(organizationId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data() as Organization;
          setOrganization(data);
        }
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return organization;
};
