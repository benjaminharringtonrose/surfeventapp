import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection } from "../common/models";
import { Event } from "../common";

export const useEvent = (eventId: string) => {
  const [event, setEvent] = useState<Event | undefined>(undefined);
  useEffect(() => {
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.events)
      .doc(eventId)
      .onSnapshot(doc => {
        if (doc !== null) {
          setEvent(doc.data() as Event);
        }
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return event;
};
