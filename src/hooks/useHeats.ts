import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, Heat } from "../common/models";
import { useAppSelector } from "./redux";

export const useHeats = (eventId: string) => {
  const [heats, setHeats] = useState<Heat[] | undefined>(undefined);
  const uid = useAppSelector(state => state.auth.user?.uid);
  useEffect(() => {
    if (!uid) {
      return;
    }
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.heats)
      .where("uid", "==", uid)
      .where("eventId", "==", eventId)
      .onSnapshot(querySnapshot => {
        const heats: Heat[] = [];
        querySnapshot?.forEach(doc => {
          const data = doc.data() as Heat;
          heats.push(data);
        });
        heats.sort((d1, d2) => d1.dateStart.toDate().getTime() - d2.dateStart.toDate().getTime());
        const mappedHeats = heats.map((heat, index) => ({ ...heat, title: `Heat #${index + 1}` }));
        setHeats(mappedHeats);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return heats;
};
