import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { HeatSheetRouteProp, RootStackNavProp } from "../AppNavigator";
import { colors, fonts, Score, shared, spacings } from "../common";
import { ButtonX } from "../components/ButtonX";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useHeat } from "../hooks/useHeat";
import Orientation from "react-native-orientation-locker";
import { ScorePopUpCard } from "../components/ScorePopUpCard";
import _ from "lodash";
import { Icon } from "../components";
import { useScores } from "../hooks/useScores";

const { width, height } = Dimensions.get("window");

export interface HeatState {
  selectedSurfer: string;
  selectedKey: string;
  scoreCardVisible: boolean;
  cellWidth: number;
}

export const HeatSheetScreen = () => {
  const hoursMinSecs = { hours: 1, minutes: 20, seconds: 40 };
  const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      reset();
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };
  const reset = () => setTime([hours, minutes, seconds]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  const [data, setData] = useState<Score[]>([]);
  const [state, setState] = useState<HeatState>({
    selectedSurfer: "",
    selectedKey: "",
    scoreCardVisible: false,
    cellWidth: 60,
  });
  const navigation = useNavigation<RootStackNavProp>();
  const { heatId } = useRoute<HeatSheetRouteProp>().params;
  const heat = useHeat(heatId);
  const scores = useScores(heatId);

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
    navigation.setOptions({
      title: "Heat Sheet",
      gestureEnabled: false,
      headerLeft: () => (
        <ButtonX
          onPress={() => {
            Orientation.lockToPortrait();
            navigation.pop();
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (scores) {
      setState({ ...state, cellWidth: height / 4 - spacings.tiny * 8 });
      setData(scores);
    }
  }, [scores]);

  const onScorePress = (key: string, surfer: string) => {
    setState({
      ...state,
      selectedKey: key,
      selectedSurfer: surfer,
      scoreCardVisible: true,
    });
  };

  const onSubmitWave = async (score: number) => {
    try {
      const heatsCollection = firestore().collection("heats");
      await heatsCollection.doc(heatId).set(
        {
          scores: {
            [state.selectedKey]: {
              surfer: state.selectedSurfer,
              waves: firestore.FieldValue.arrayUnion(score),
            },
          },
        },
        { merge: true },
      );
    } catch (e) {
      console.warn(e);
    }
    setState({
      ...state,
      scoreCardVisible: false,
    });
  };

  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<Score>) => {
    const data = item; // needed to change name because of nested FlatLists
    const backgroundColor = isActive ? colors.greyscale7 : colors.greyscale9;
    return (
      <View
        key={`${data.surfer}${data.color}`}
        style={[styles.rowRootContainer, { backgroundColor }]}>
        <TouchableOpacity onLongPress={drag} style={styles.rowTouchable}>
          <View style={styles.rowSurferTextContainer}>
            <View style={{ flex: 2 }}>
              <View style={[styles.rowJerseyCircle, { backgroundColor: data.color }]} />
            </View>
            <View style={{ flex: 8 }}>
              <Text style={{ color: colors.almostWhite }}>{data.surfer}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <FlatList
          horizontal
          data={data.waves}
          keyExtractor={index => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onScorePress(data.key, data.surfer)}
                style={[styles.waveCell, { width: state.cellWidth, height: state.cellWidth }]}>
                <Text style={{ fontSize: 24, fontWeight: "400", color: colors.almostWhite }}>
                  {item.toString()}
                </Text>
              </TouchableOpacity>
            );
          }}
          ListHeaderComponent={
            <TouchableOpacity
              onPress={() => onScorePress(data.key, data.surfer)}
              style={[styles.addWaveCell, { width: state.cellWidth, height: state.cellWidth }]}>
              <Icon name={"add"} color={colors.almostWhite} size={30} />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }, []);

  if (!heat || !scores) return null;

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => setData(data)}
          initialNumToRender={scores.length}
          contentContainerStyle={{
            borderColor: colors.greyscale1,
            borderWidth: 1,
            borderRadius: shared.borderRadius,
          }}
          ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: colors.greyscale1, height: 1 }} />
          )}
          showsVerticalScrollIndicator={false}
        />
        <View style={[styles.rightContainer, { width: 100 }]}>
          <View style={{ width: 100, alignItems: "center", paddingTop: spacings.tiny }}>
            <Text
              style={{ color: colors.almostWhite, fontSize: 17 }}>{`${hrs}:${mins}:${secs}`}</Text>
          </View>
        </View>
      </View>
      <ScorePopUpCard
        label={"Score"}
        visible={state.scoreCardVisible}
        onPress={onSubmitWave}
        onClose={() => setState({ ...state, scoreCardVisible: false })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.greyscale9,
  },
  rightContainer: {
    marginLeft: spacings.xsmall,
    flexDirection: "row",
    borderColor: colors.greyscale1,
    borderWidth: 1,
    borderRadius: shared.borderRadius,
    backgroundColor: colors.greyscale7,
    marginBottom: spacings.tiny,
  },
  rowRootContainer: {
    flexDirection: "row",
    margin: spacings.tiny,
  },
  rowTouchable: {
    width: 100,
    borderRadius: shared.borderRadius,
    paddingVertical: spacings.xsmall,
    paddingLeft: spacings.xsmall,
  },
  rowSurferTextContainer: {
    flex: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  rowJerseyCircle: {
    flex: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  addWaveCell: {
    borderRightWidth: 1,
    borderRightColor: colors.greyscale1,
    borderRadius: shared.borderRadius,
    backgroundColor: colors.greyscale1,
    margin: spacings.tiny,
    alignItems: "center",
    justifyContent: "center",
  },
  waveCell: {
    borderRightWidth: 1,
    borderRightColor: colors.greyscale1,
    borderRadius: shared.borderRadius,
    backgroundColor: colors.greyscale1,
    margin: spacings.tiny,
    alignItems: "center",
    justifyContent: "center",
  },
});
