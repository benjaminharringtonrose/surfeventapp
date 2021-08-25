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

const { width, height } = Dimensions.get("window");

export interface HeatState {
  selectedSurfer: string;
  selectedKey: string;
  scoreCardVisible: boolean;
}

export const HeatSheetScreen = () => {
  const [data, setData] = useState<Score[]>([]);
  const [state, setState] = useState<HeatState>({
    selectedSurfer: "",
    selectedKey: "",
    scoreCardVisible: false,
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
      console.log("scores: ", scores);
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
          contentContainerStyle={{ borderBottomColor: colors.greyscale1, borderBottomWidth: 1 }}
        />
        <View style={[styles.headerContainer, { width: 100 }]}></View>
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
  headerContainer: {
    flexDirection: "row",
    height,
    borderColor: colors.greyscale1,
    borderWidth: 1,
    borderRadius: shared.borderRadius,
  },
  rowRootContainer: {
    flexDirection: "row",
    borderTopColor: colors.greyscale1,
    borderTopWidth: 1,
  },
  rowTouchable: {
    width: 100,
    paddingVertical: spacings.xsmall,
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
