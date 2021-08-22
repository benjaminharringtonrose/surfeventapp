import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection } from "../common/models";
import { useAppSelector } from "./redux";
import { Event } from "../common";

export const useEvent = (eventId: string) => {
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const uid = useAppSelector(state => state.auth.user?.uid);

  useEffect(() => {
    if (!uid) {
      return;
    }
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.events)
      .doc(eventId)
      .onSnapshot(doc => {
        if (doc.exists) {
          setEvent(doc.data() as Event);
        }
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return event;
};
