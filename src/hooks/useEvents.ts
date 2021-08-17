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
        events.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime());
        setEvents(events);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return events;
};