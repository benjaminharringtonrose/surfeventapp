import React, { useEffect, useState } from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import * as Progress from "react-native-progress";
import { colors, spacings } from "../common";
import PushNotification from "react-native-push-notification";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setIsRunning, setTime } from "../store/slices/heatSlice";
import { Button } from "./Button";

interface ICountdownTimerProps {
  timer: {
    minutes: number;
    seconds: number;
  };
  color: string;
  size: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  startLabel?: string;
  stopLabel?: string;
}

export const CountdownTimer = (props: ICountdownTimerProps) => {
  const { minutes = 0, seconds = 60 } = props.timer;
  const dispatch = useAppDispatch();
  const { mins, secs } = useAppSelector(state => state.heat.timer);
  const isRunning = useAppSelector(state => state.heat.isRunning);
  const uid = useAppSelector(state => state.auth.user?.uid);

  const tick = () => {
    if (secs === 0) {
      dispatch(setTime({ timer: { mins: mins - 1, secs: 59 } }));
    } else {
      dispatch(setTime({ timer: { mins: mins, secs: secs - 1 } }));
    }
  };

  const reset = () => dispatch(setTime({ timer: { mins: minutes, secs: seconds } }));

  useEffect(() => {
    const timerId = setInterval(() => {
      const timesUp = mins === 0 && secs === 0;
      if (timesUp) {
        clearInterval(timerId);
      } else {
        if (isRunning) {
          tick();
        }
      }
    }, 1000);
    return () => clearInterval(timerId);
  });

  useEffect(() => {
    if (mins === 5 && secs === 0) {
      if (uid) {
        //
      }
    }
  });

  const formattedMins = mins.toString().padStart(2, "0");
  const formattedSecs = secs.toString().padStart(2, "0");

  const progress = (mins * 60 + secs) / (minutes * 60 + seconds);

  return (
    <View style={[props.style]}>
      <Progress.Circle
        size={props.size}
        progress={progress}
        showsText
        formatText={_ => `${formattedMins}:${formattedSecs}`}
        direction={"counter-clockwise"}
        color={colors.grey500}
      />
      <View style={{ flexDirection: "row" }}>
        <Button
          label={props?.startLabel || "Start"}
          onPress={() => {
            dispatch(setIsRunning({ isRunning: true }));
          }}
          type={"bordered"}
          style={{ marginTop: spacings.small, marginRight: spacings.small }}
        />
        <Button
          label={props?.stopLabel || "Stop"}
          onPress={() => {
            dispatch(setIsRunning({ isRunning: false }));
          }}
          type={"bordered"}
          style={{ marginTop: spacings.small }}
        />
      </View>
    </View>
  );
};
