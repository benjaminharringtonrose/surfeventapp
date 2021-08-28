import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, FirebaseHeat } from "../common/models";
import { useAppSelector } from "./redux";
import { getDivisionById } from "../common/util";

export const useHeat = (heatId: string) => {
  const [heat, setHeat] = useState<FirebaseHeat | undefined>(undefined);
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
          const data = doc.data() as FirebaseHeat;
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
