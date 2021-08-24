import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { HeatSheetRouteProp, RootStackNavProp } from "../AppNavigator";
import { colors, shared, spacings, Wave } from "../common";
import { ButtonX } from "../components/ButtonX";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useHeat } from "../hooks/useHeat";
import Orientation from "react-native-orientation-locker";
import { COLORS } from "../common/constants";
import { ScorePopUpCard } from "../components/ScorePopUpCard";
import _ from "lodash";
import { Icon } from "../components";
import { useWaves } from "../hooks/useWaves";

export interface HeatData {
  surfer: string;
  waveScores: (number | string)[];
  color: string;
}

export const HeatSheetScreen = () => {
  const [scoreCardVisible, setScoreCardVisible] = useState<boolean>(false);
  const [surfer, setSurfer] = useState<string | undefined>(undefined);
  const navigation = useNavigation<RootStackNavProp>();
  const { heatId } = useRoute<HeatSheetRouteProp>().params;
  const heat = useHeat(heatId);
  const allWaves = useWaves(heatId);

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

  const initialHeatData: HeatData[] = heat?.surfers
    ? heat.surfers.map((surfer, index) => {
        return {
          surfer,
          color: COLORS[index],
          waveScores: [],
        };
      })
    : [];

  const [heatData, setHeatData] = useState<HeatData[]>(initialHeatData);

  useEffect(() => {
    setHeatData(initialHeatData);
  }, [heat]);

  const onScorePress = (surfer: string) => {
    setSurfer(surfer);
    setScoreCardVisible(true);
  };

  const onSubmitWave = async (score: number) => {
    try {
      const wavesCollection = firestore().collection("waves");
      const heatsCollection = firestore().collection("heats");
      const waveId = wavesCollection.doc().id;
      await wavesCollection.doc(waveId).set({ heatId, waveId, surfer, score });
      await heatsCollection
        .doc(heatId)
        .set({ waves: firestore.FieldValue.arrayUnion(waveId) }, { merge: true });
    } catch (e) {
      console.warn(e);
    }
    setScoreCardVisible(false);
  };

  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<HeatData>) => {
    const surfer = item.surfer;
    const wavesData = allWaves.filter(wave => wave.heatId === heatId && wave.surfer === surfer);

    console.log(wavesData);

    return (
      <View
        key={`${item.surfer}${item.color}`}
        style={[
          styles.rowRootContainer,
          { backgroundColor: isActive ? colors.greyscale7 : colors.greyscale9 },
        ]}>
        <TouchableOpacity onLongPress={drag} style={styles.rowTouchable}>
          <View style={styles.rowSurferTextContainer}>
            <View style={[styles.rowJerseyCircle, { backgroundColor: item.color }]} />
            <Text style={{ color: colors.almostWhite, paddingLeft: spacings.xsmall }}>
              {item.surfer}
            </Text>
          </View>
        </TouchableOpacity>
        <FlatList
          horizontal
          data={wavesData}
          keyExtractor={item => item.waveId}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item.waveId}
                onPress={() => onScorePress(surfer)}
                style={styles.waveCell}>
                <Text style={{ color: colors.grey700, paddingLeft: spacings.xsmall }}>
                  {item.score.toString()}
                </Text>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <TouchableOpacity onPress={() => onScorePress(surfer)} style={styles.addWaveCell}>
              <Icon name={"add"} color={colors.almostWhite} size={30} />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }, []);

  if (!heat || !allWaves) return null;

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubcontainer}>
          <Text style={styles.headerText}>{"Surfers"}</Text>
        </View>
        <View style={{ justifyContent: "flex-end" }}>
          <Text style={styles.headerText}>{"Waves"}</Text>
        </View>
      </View>
      <DraggableFlatList
        data={heatData}
        renderItem={renderItem}
        keyExtractor={item => `draggable-item-${item.surfer}`}
        onDragEnd={({ data }) => setHeatData(data)}
        initialNumToRender={heatData.length}
        contentContainerStyle={{ borderBottomColor: colors.greyscale1, borderBottomWidth: 1 }}
      />
      <ScorePopUpCard label={"Score"} visible={scoreCardVisible} onPress={onSubmitWave} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.greyscale9,
  },
  headerContainer: {
    flexDirection: "row",
    height: 50,
    borderTopColor: colors.greyscale1,
    borderTopWidth: 1,
    borderRightColor: colors.greyscale1,
    borderRightWidth: 1,
    borderTopRightRadius: shared.borderRadius,
    borderTopLeftRadius: shared.borderRadius,
  },
  headerSubcontainer: {
    width: 150,
    borderRightWidth: 1,
    borderTopLeftRadius: shared.borderRadius,
    borderRightColor: colors.greyscale1,
    borderLeftWidth: 1,
    borderLeftColor: colors.greyscale1,
    justifyContent: "flex-end",
  },
  headerText: {
    color: colors.almostWhite,
    paddingLeft: spacings.xsmall,
    paddingBottom: spacings.xsmall,
  },
  rowRootContainer: {
    flexDirection: "row",
    borderTopColor: colors.greyscale1,
    borderTopWidth: 1,
  },
  rowTouchable: {
    width: 150,
    paddingVertical: spacings.xsmall,
    borderRightWidth: 1,
    borderRightColor: colors.greyscale1,
    borderLeftWidth: 1,
    borderLeftColor: colors.greyscale1,
  },
  rowSurferTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowJerseyCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,

    marginLeft: spacings.xsmall,
  },
  addWaveCell: {
    width: 80,
    height: 80,
    borderRightWidth: 1,
    borderRightColor: colors.greyscale1,
    borderRadius: shared.borderRadius,
    backgroundColor: colors.greyscale1,
    margin: spacings.tiny,
    alignItems: "center",
    justifyContent: "center",
  },
  waveCell: {
    width: 80,
    height: 80,
    borderRightWidth: 1,
    borderRightColor: colors.greyscale1,
    borderRadius: shared.borderRadius,
    backgroundColor: colors.greyscale1,
    margin: spacings.tiny,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mockHeatData = [
  {
    key: 0,
    surfer: "Billy Barrels",
    waveScores: [4.6, 5.3, 2.3, 1.7],
    color: "red",
  },
  {
    key: 1,
    surfer: "Timmy Tubes",
    waveScores: [2.1, 3.3, 7.4, 3.7, 1.2, 2.7],
    color: "red",
  },
  {
    key: 3,
    surfer: "Ricky Rails",
    waveScores: [8.6, 4.3],
    color: "red",
  },
];
