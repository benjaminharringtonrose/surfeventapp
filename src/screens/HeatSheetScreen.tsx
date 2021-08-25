import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { HeatSheetRouteProp, RootStackNavProp } from "../AppNavigator";
import { colors, fonts, Score, shared, spacings, Wave } from "../common";
import { ButtonX } from "../components/ButtonX";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useHeat } from "../hooks/useHeat";
import Orientation from "react-native-orientation-locker";
import { ScorePopUpCard } from "../components/ScorePopUpCard";
import _ from "lodash";
import { Icon } from "../components";
import { useWaves } from "../hooks/useWaves";
import { useScores } from "../hooks/useScores";
import { number } from "yup";

export interface HeatState {
  draggableFlatListData?: Score[];
  selectedSurfer: string;
  selectedKey: string;
  scoreCardVisible: boolean;
}

export const HeatSheetScreen = () => {
  const [state, setState] = useState<HeatState>({
    draggableFlatListData: undefined,
    selectedSurfer: "",
    selectedKey: "",
    scoreCardVisible: false,
  });
  const navigation = useNavigation<RootStackNavProp>();
  const { heatId } = useRoute<HeatSheetRouteProp>().params;
  const heat = useHeat(heatId);
  const allWaves = useWaves(heatId);
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
            <View style={[styles.rowJerseyCircle, { backgroundColor: data.color }]} />
            <Text style={{ color: colors.almostWhite, paddingLeft: spacings.xsmall }}>
              {data.surfer}
            </Text>
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
                style={styles.waveCell}>
                <Text style={{ fontSize: 24, fontWeight: "400", color: colors.almostWhite }}>
                  {item.toString()}
                </Text>
              </TouchableOpacity>
            );
          }}
          ListHeaderComponent={
            <TouchableOpacity
              onPress={() => onScorePress(data.key, data.surfer)}
              style={styles.addWaveCell}>
              <Icon name={"add"} color={colors.almostWhite} size={30} />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }, []);

  if (!heat || !allWaves || !scores) return null;

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
        data={scores || []}
        renderItem={renderItem}
        keyExtractor={item => `draggable-item-${item.key}`}
        onDragEnd={({ data }) => setState({ ...state, draggableFlatListData: data })}
        initialNumToRender={scores.length}
        contentContainerStyle={{ borderBottomColor: colors.greyscale1, borderBottomWidth: 1 }}
      />
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
