import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";
import { JudgeNavProp } from "../AppNavigator";
import { colors, fonts, shared, spacings } from "../common";
import { AddHeatModal } from "../common/modals/AddHeatModal";

export const JudgeDashboardScreen = () => {
  const width = Dimensions.get("window").width - 2 * spacings.base;
  const addHeatModalRef = useRef<Modalize>(null);

  const navigation = useNavigation<JudgeNavProp>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => {}} style={{ marginHorizontal: spacings.base }}>
            <Icon name={"timer"} size={32} color={colors.yellowCream} />
          </TouchableOpacity>
        );
      },
    });
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
      }}>
      <TouchableOpacity
        onPress={() => addHeatModalRef.current?.open()}
        style={[shared.card, shared.shadow, { marginVertical: spacings.base, width }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: spacings.small,
          }}>
          <Text style={{ color: colors.grey500, fontSize: 21 }}>{"Add Surf Heat"}</Text>
          <Icon name={"add"} size={28} color={colors.grey500} />
        </View>
      </TouchableOpacity>
      <View style={{ width, paddingBottom: spacings.small }}>
        <Text style={{ color: colors.grey500, fontSize: 21 }}>{"Upcoming Heats"}</Text>
      </View>
      <View
        style={[
          shared.card,
          shared.shadow,
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width,
            height: width,
            marginBottom: spacings.base,
          },
        ]}></View>
      <AddHeatModal ref={addHeatModalRef} onClose={() => addHeatModalRef.current?.close()} />
    </SafeAreaView>
  );
};
