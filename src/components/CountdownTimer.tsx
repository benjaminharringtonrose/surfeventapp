import React, { useEffect, useState } from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { colors } from "../common";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setTime } from "../store/slices/heatSlice";

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
  const dispatch = useAppDispatch();
  const { hrs, mins, secs } = useAppSelector(state => state.heat.timer);

  useEffect(() => {
    dispatch(setTime({ timer: { hrs: hours, mins: minutes, secs: seconds } }));
  }, []);

  const tick = () => {
    if (mins === 0 && secs === 0) {
      dispatch(setTime({ timer: { hrs: hrs - 1, mins: 59, secs: 59 } }));
    } else if (secs === 0) {
      dispatch(setTime({ timer: { hrs, mins: mins - 1, secs: 59 } }));
    } else {
      dispatch(setTime({ timer: { hrs, mins: mins, secs: secs - 1 } }));
    }
  };

  const reset = () => dispatch(setTime({ timer: { hrs: hours, mins: minutes, secs: seconds } }));

  useEffect(() => {
    const timerId = setInterval(() => {
      const timesUp = hrs === 0 && mins === 0 && secs === 0;
      if (timesUp) {
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
