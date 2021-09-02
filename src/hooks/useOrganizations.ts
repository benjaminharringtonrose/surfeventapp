import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, Organization } from "../common/models";

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[] | undefined>(undefined);
  useEffect(() => {
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.organizations)
      .onSnapshot(querySnapshot => {
        const organizations: Organization[] = [];
        querySnapshot?.forEach(doc => {
          organizations.push(doc.data() as Organization);
        });
        setOrganizations(organizations);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return organizations;
};
