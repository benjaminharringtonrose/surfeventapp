import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, Heat, Wave } from "../common/models";

export const useWaves = (heatId: string) => {
  const [waves, setWaves] = useState<Wave[] | []>([]);
  useEffect(() => {
    if (!heatId) {
      return;
    }
    var unsubscribe = firebase
      .firestore()
      .collection(Collection.waves)
      .where("heatId", "==", heatId)
      .onSnapshot(querySnapshot => {
        const waves: any[] = [];
        querySnapshot?.forEach(doc => {
          const data = doc.data() as Wave;
          if (data.heatId === heatId) {
            waves.push(data);
          }
        });
        setWaves(waves);
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return waves;
};
