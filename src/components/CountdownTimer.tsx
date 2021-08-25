import React, { useEffect } from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { colors } from "../common";

interface ICountdownTimerProps {
  timer: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const CountdownTimer = (props: ICountdownTimerProps) => {
  const { hours = 0, minutes = 0, seconds = 60 } = props.timer;
  const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);

  const tick = () => {
    if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const reset = () => setTime([hours, minutes, seconds]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (hrs === 0 && mins === 0 && secs === 0) {
        clearInterval(timerId);
      } else {
        tick();
      }
    }, 1000);
    return () => clearInterval(timerId);
  });

  const fomattedHrs = hrs.toString().padStart(2, "0");
  const formattedMins = mins.toString().padStart(2, "0");
  const formattedSecs = secs.toString().padStart(2, "0");

  return (
    <View style={[props.style]}>
      <Text style={[props.textStyle]}>{`${fomattedHrs}:${formattedMins}:${formattedSecs}`}</Text>
    </View>
  );
};
