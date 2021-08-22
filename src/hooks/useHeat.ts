import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, Heat } from "../common/models";
import { useAppSelector } from "./redux";
import { getDivisionById } from "../common/util";

export const useHeat = (heatId: string) => {
  const [heat, setHeat] = useState<Heat | undefined>(undefined);
  const uid = useAppSelector(state => state.auth.user?.uid);

  useEffect(() => {
    if (!uid) {
      return;
    }
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.heats)
      .doc(heatId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data() as Heat;
          const division = getDivisionById(data.division);
          const heat = { ...data, division };
          setHeat(heat);
        }
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return heat;
};
