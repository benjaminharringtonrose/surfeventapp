import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text, FlatList } from "react-native";
import { HeatSheetRouteProp, RootStackNavProp } from "../AppNavigator";
import { colors, shared, spacings } from "../common";
import { ButtonX } from "../components/ButtonX";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useHeat } from "../hooks/useHeat";
import Orientation from "react-native-orientation-locker";
import { COLORS } from "../common/constants";
import { ScorePopUpCard } from "../components/ScorePopUpCard";

interface Item {
  key: string;
  surfer: string;
  color: string;
}

export const HeatSheetScreen = () => {
  const [data, setData] = useState<Item[]>([]);
  const [scoreCardVisible, setScoreCardVisible] = useState<boolean>(false);
  const navigation = useNavigation<RootStackNavProp>();
  const { heatId } = useRoute<HeatSheetRouteProp>().params;
  const heat = useHeat(heatId);

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
    setData(heatData);
  }, [heat]);

  const heatData: Item[] = heat?.surfers
    ? heat.surfers.map((surfer, index) => {
        return {
          key: index.toString(),
          surfer,
          color: COLORS[index],
        };
      })
    : [];

  const waveData = [...Array(10)].map((d, index) => {
    return {
      key: index,
      label: String(index + 1),
    };
  });

  const onScorePress = () => {
    setScoreCardVisible(true);
  };

  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: isActive ? colors.greyscale7 : colors.greyscale9,
          borderTopColor: colors.greyscale1,
          borderTopWidth: 1,
        }}>
        <TouchableOpacity
          onLongPress={drag}
          style={{
            width: 150,
            paddingVertical: spacings.xsmall,
            borderRightWidth: 1,
            borderRightColor: colors.greyscale1,
            borderLeftWidth: 1,
            borderLeftColor: colors.greyscale1,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: item.color,
                marginLeft: spacings.xsmall,
              }}
            />
            <Text style={{ color: colors.almostWhite, paddingLeft: spacings.xsmall }}>
              {item.surfer}
            </Text>
          </View>
        </TouchableOpacity>
        <FlatList
          horizontal
          data={waveData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={onScorePress}
                style={{
                  width: 80,
                  height: 80,
                  borderRightWidth: 1,
                  borderRightColor: colors.greyscale1,
                }}>
                <Text style={{ color: colors.grey700, paddingLeft: spacings.xsmall }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }, []);

  if (!heat) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.greyscale9,
      }}>
      <View
        style={{
          flexDirection: "row",
          height: 50,
          borderTopColor: colors.greyscale1,
          borderTopWidth: 1,
          borderRightColor: colors.greyscale1,
          borderRightWidth: 1,
          borderTopRightRadius: shared.borderRadius,
          borderTopLeftRadius: shared.borderRadius,
        }}>
        <View
          style={{
            width: 150,
            borderRightWidth: 1,
            borderTopLeftRadius: shared.borderRadius,
            borderRightColor: colors.greyscale1,
            borderLeftWidth: 1,
            borderLeftColor: colors.greyscale1,

            justifyContent: "flex-end",
          }}>
          <Text
            style={{
              color: colors.almostWhite,
              paddingLeft: spacings.xsmall,
              paddingBottom: spacings.xsmall,
            }}>
            {"Surfers"}
          </Text>
        </View>
        <View style={{ justifyContent: "flex-end" }}>
          <Text
            style={{
              color: colors.almostWhite,
              paddingLeft: spacings.xsmall,
              paddingBottom: spacings.xsmall,
            }}>
            {"Waves"}
          </Text>
        </View>
      </View>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        onDragEnd={({ data }) => setData(data)}
        initialNumToRender={heatData.length}
        contentContainerStyle={{ borderBottomColor: colors.greyscale1, borderBottomWidth: 1 }}
      />
      <ScorePopUpCard
        label={"Score"}
        visible={scoreCardVisible}
        onPress={() => setScoreCardVisible(false)}
      />
    </SafeAreaView>
  );
};
