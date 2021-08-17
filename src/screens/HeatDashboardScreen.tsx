import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";
import { HeatNavProp } from "../AppNavigator";
import { colors, shared, spacings } from "../common";
import { AddHeatModal } from "../modals/AddHeatModal";
import { ButtonAdd } from "../components/ButtonAdd";

export const HeatDashboardScreen = () => {
  const width = Dimensions.get("window").width - 2 * spacings.base;
  const addHeatModalRef = useRef<Modalize>(null);

  const navigation = useNavigation<HeatNavProp>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => {}} style={{ marginHorizontal: spacings.base }}>
            <Icon name={"timer"} size={32} color={colors.almostWhite} />
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
      }}>
      <ButtonAdd
        label={"add surf heat"}
        onPress={() => addHeatModalRef.current?.open()}
        style={{ marginHorizontal: spacings.base }}
      />

      <View style={{ padding: spacings.base }}>
        <Text style={{ color: colors.grey500, fontSize: 21 }}>{"upcoming heats"}</Text>
      </View>
      <View
        style={[
          shared.card,
          shared.shadow,
          {
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
