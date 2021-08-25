import { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Collection, Heat, Score } from "../common/models";
import { useAppSelector } from "./redux";
import { COLORS } from "../common/constants";

export const useScores = (heatId: string) => {
  const [scores, setScores] = useState<any>(undefined);
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
          let index = 0;
          const scores = [];
          const data = doc.data() as Heat;
          const surferData = data.scores;

          for (const key in surferData) {
            scores.push({ ...surferData[key], color: COLORS[index], key });
            index += 1;
          }
          setScores(scores);
        }
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return scores as Score[];
};
