import React, { useEffect, useState } from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle, Platform } from "react-native";
import * as Progress from "react-native-progress";
import BackgroundTimer from "react-native-background-timer";
import { spacings } from "../common";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setIsRunning, setTime } from "../store/slices/heatSlice";
import { Button } from "./Button";
import PushNotification, { PushNotificationScheduleObject } from "react-native-push-notification";
import { AddMinutesToDate } from "../util/dates";
import { useColors } from "../hooks/useColors";

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
  const colors = useColors();
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
    if (Platform.OS == "ios") {
      BackgroundTimer.start();
    }
    const timerId = BackgroundTimer.setInterval(() => {
      const timesUp = mins === 0 && secs === 0;
      if (timesUp) {
        clearInterval(timerId);
      } else {
        if (isRunning) {
          tick();
        }
      }
    }, 1000);
    return () => BackgroundTimer.clearInterval(timerId);
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
            const notification: PushNotificationScheduleObject = {
              date: AddMinutesToDate(new Date(), 10),
              message: "5 minutes left!",
              vibrate: true,
              playSound: true,
            };
            PushNotification.localNotificationSchedule(notification);
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
