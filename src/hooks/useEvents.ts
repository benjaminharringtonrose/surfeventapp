import { useState, useEffect } from "react";
import { firebase, FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Collection, Event, IError } from "../common/models";
import { useAppSelector } from "./redux";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[] | undefined>(undefined);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(false);
  const [eventsError, setEventsError] = useState<IError | undefined>(undefined);

  const organizationId = useAppSelector(state => state.user.user?.organizationId);
  console.log("useEvents ::: organizationId ::: ", organizationId);

  useEffect(() => {
    if (!organizationId) {
      return;
    }
    setLoadingEvents(true);
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.events)
      .onSnapshot(querySnapshot => {
        const events: Event[] = [];
        querySnapshot?.forEach(
          doc => {
            console.log(doc.data());
            events.push(doc.data() as Event);
          },
          (error: IError) => {
            setEventsError(error);
            setLoadingEvents(false);
          },
        );
        events.sort(
          (d1, d2) =>
            new Date(d1.dateStart.toDate()).getTime() - new Date(d2.dateStart.toDate()).getTime(),
        );
        setEvents(events);
        setLoadingEvents(false);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return { events, loadingEvents, eventsError };
};
