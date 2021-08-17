import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection } from "../common/models";
import { useAppSelector } from "./redux";

export const useEvents = () => {
  const [events, setEvents] = useState<any>(undefined);
  const uid = useAppSelector(state => state.auth.user?.uid);

  useEffect(() => {
    if (!uid) {
      return;
    }
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.events)
      .where("uid", "==", uid)
      .onSnapshot(querySnapshot => {
        const events: any[] = [];
        querySnapshot.forEach(doc => {
          events.push(doc.data());
        });
        setEvents(events);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return events;
};
