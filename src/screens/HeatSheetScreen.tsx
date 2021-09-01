import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Orientation from "react-native-orientation-locker";
import _ from "lodash";

import { HeatSheetRouteProp, RootStackNavProp } from "../AppNavigator";
import { colors, FirebaseHeat, Score, shared, spacings, Wave } from "../common";
import { useHeat } from "../hooks/useHeat";
import { Icon, ButtonX, ScorePopUpCard } from "../components";
import { useScores } from "../hooks/useScores";
import { abbreviateName, computeWaveScoreTotal, getWave } from "../common/util";

export interface LocalState {
  selectedSurfer: string;
  selectedKey: string;
  selectedWaveId?: string;
  selectedScoreTotal?: number;
  scoreCardVisible: boolean;
  cellWidth: number;
}

export const HeatSheetScreen = () => {
  const [state, setState] = useState<LocalState>({
    selectedSurfer: "",
    selectedKey: "",
    selectedWaveId: undefined,
    scoreCardVisible: false,
    selectedScoreTotal: undefined,
    cellWidth: 62,
  });
  const navigation = useNavigation<RootStackNavProp>();
  const route = useRoute<HeatSheetRouteProp>();
  const { heatId } = useRoute<HeatSheetRouteProp>().params;
  const heat = useHeat(heatId);
  const scores = useScores(heatId);

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
    navigation.setOptions({
      title: route.params.title,
      gestureEnabled: false,
      headerLeft: () => (
        <ButtonX
          onPress={() => {
            Orientation.lockToPortrait();
            navigation.pop();
          }}
          style={{ paddingHorizontal: spacings.base }}
        />
      ),
    });
  }, []);

  const onScorePress = (key: string, surfer: string, waveId?: string) => {
    setState({
      ...state,
      selectedKey: key,
      selectedSurfer: surfer,
      selectedWaveId: waveId,
      scoreCardVisible: true,
    });
  };

  const onSubmitWave = async ({
    score,
    disqualified,
  }: {
    score: number;
    disqualified: boolean;
  }) => {
    try {
      const heatsCollection = firestore().collection("heats");
      const waveId = state.selectedWaveId ? state.selectedWaveId : heatsCollection.doc().id;
      await heatsCollection.doc(heatId).set(
        {
          scores: {
            [state.selectedKey]: {
              surfer: state.selectedSurfer,
              waves: {
                [waveId]: {
                  time: new Date(),
                  score,
                  disqualified,
                },
              },
            },
          },
        },
        { merge: true },
      );
      const response = await heatsCollection.doc(heatId).get();
      const heat = response.data() as FirebaseHeat;
      const waves = [] as Wave[];
      const waveData = heat.scores[state.selectedKey].waves;
      for (const key in waveData) {
        waves.push({
          waveId: key,
          score: waveData[key].score,
          time: waveData[key].time,
          disqualified: waveData[key].disqualified,
        });
      }
      const topTwoTotal = waves
        ?.filter(waves => waves.disqualified === false)
        .sort((a, b) => b.score - a.score)
        .filter((_, index) => index < 2)
        .reduce((acc, value) => acc + value.score, 0);

      await heatsCollection.doc(heatId).set(
        {
          scores: {
            [state.selectedKey]: {
              total: topTwoTotal,
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

  const onRemoveWave = async () => {
    try {
      if (state.selectedWaveId) {
        const total = computeWaveScoreTotal(scores, state.selectedKey, state.selectedWaveId);
        const heatsCollection = firestore().collection("heats");
        await heatsCollection.doc(heatId).set(
          {
            scores: {
              [state.selectedKey]: {
                surfer: state.selectedSurfer,
                total: total,
                waves: {
                  [state.selectedWaveId]: firestore.FieldValue.delete(),
                },
              },
            },
          },
          { merge: true },
        );
      }
    } catch (e) {
      console.warn(e);
    }
    setState({
      ...state,
      scoreCardVisible: false,
    });
  };

  if (!heat || !scores) return null;

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <FlatList
          data={scores}
          renderItem={({ item }) => {
            const data = item;
            // ^^ need to change name because scoping issue
            const [firstName, lastName] = data.surfer.split(" ");
            return (
              <View
                key={`${data.surfer}${data.color}`}
                style={[styles.rowRootContainer, { backgroundColor: colors.greyscale9 }]}>
                <View style={styles.rowTouchable}>
                  <View style={styles.rowSurferTextContainer}>
                    <View style={{ flex: 2 }}>
                      <View style={[styles.rowJerseyCircle, { backgroundColor: data.color }]} />
                    </View>
                    <View style={{ flex: 8 }}>
                      <Text style={{ color: colors.almostWhite }}>{firstName}</Text>
                      <Text style={{ color: colors.almostWhite }}>{lastName}</Text>
                    </View>
                  </View>
                </View>
                <FlatList
                  horizontal
                  data={data.waves}
                  keyExtractor={item => item.waveId}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        key={item.waveId}
                        onPress={() => onScorePress(data.key, data.surfer, item.waveId)}
                        style={[
                          styles.waveCell,
                          { width: state.cellWidth, height: state.cellWidth },
                        ]}>
                        <Text style={styles.waveIndex}>{`${index + 1}`}</Text>
                        {item.disqualified && (
                          <Icon
                            name={"close"}
                            color={colors.red}
                            size={24}
                            style={styles.disqualifiedText}
                          />
                        )}
                        <Text
                          style={{ fontSize: 24, fontWeight: "400", color: colors.almostWhite }}>
                          {item.score.toString()}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  ListHeaderComponent={
                    <TouchableOpacity
                      onPress={() => onScorePress(data.key, data.surfer)}
                      style={[
                        styles.addWaveCell,
                        { width: state.cellWidth, height: state.cellWidth },
                      ]}>
                      <Icon name={"add"} color={colors.almostWhite} size={30} />
                    </TouchableOpacity>
                  }
                />
              </View>
            );
          }}
          keyExtractor={item => `item-${item.key}`}
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
        <View style={[styles.rightContainer, { width: 200 }]}>
          <View style={{ marginBottom: spacings.small }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", paddingTop: spacings.xsmall }}>
              <View style={{ flex: 2 }} />
              <Text style={{ flex: 1, color: colors.almostWhite }}>{"TOTAL"}</Text>
            </View>
            {scores?.map((score, index) => {
              return (
                <View
                  key={`${score}-${index}`}
                  style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={[styles.jerseySquare, { backgroundColor: score.color }]} />
                  <Text style={{ flex: 2, color: colors.almostWhite }}>
                    {abbreviateName(score.surfer)}
                  </Text>
                  <Text style={{ flex: 1, color: colors.almostWhite }}>
                    {!!score?.total ? score.total.toFixed(1) : "---"}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <ScorePopUpCard
        label={"SCORE"}
        wave={getWave(scores, state.selectedKey, state.selectedWaveId)}
        visible={state.scoreCardVisible}
        onApply={onSubmitWave}
        onRemove={onRemoveWave}
        onClose={() => setState({ ...state, scoreCardVisible: false })}
        isAddWaveCell={!state.selectedWaveId}
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
    justifyContent: "space-between",
    marginLeft: spacings.xsmall,
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
  waveIndex: {
    position: "absolute",
    top: spacings.tiny,
    bottom: 0,
    left: spacings.tiny,
    right: 0,
    fontSize: 12,
    color: colors.almostWhite,
  },
  disqualifiedText: {
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    top: spacings.tiny,
    bottom: 0,
    left: 46,
    right: 0,
    fontSize: 12,
  },
  jerseySquare: {
    width: 10,
    height: 10,
    margin: spacings.xsmall,
  },
});
