import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection } from "../common/models";
import { useAppSelector } from "./redux";
import { RouteProp, useRoute } from "@react-navigation/native";
import { EventStackParamList } from "../AppNavigator";

export const useEvent = () => {
  const [event, setEvent] = useState<any>(undefined);
  const uid = useAppSelector(state => state.auth.user?.uid);
  const eventId = useRoute<RouteProp<EventStackParamList, "EventDetails">>().params.eventId;

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
          setEvent(doc.data());
        }
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return event;
};
