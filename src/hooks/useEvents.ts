import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, Event } from "../common/models";
import { useAppSelector } from "./redux";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[] | undefined>(undefined);
  const organizationId = useAppSelector(state => state.user.user?.organizationId);
  console.log("ORGANIZATIONid ----> ", organizationId);
  useEffect(() => {
    if (!organizationId) {
      return;
    }
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.events)
      .onSnapshot(querySnapshot => {
        const events: Event[] = [];
        querySnapshot?.forEach(doc => {
          console.log(doc.data());
          events.push(doc.data() as Event);
        });
        events.sort(
          (d1, d2) =>
            new Date(d1.dateStart.toDate()).getTime() - new Date(d2.dateStart.toDate()).getTime(),
        );
        setEvents(events);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return events;
};
