import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";
import { HeatNavProp } from "../AppNavigator";
import { colors, fonts, shared, spacings } from "../common";
import { ButtonAdd } from "../components/ButtonAdd";

export const HeatDashboardScreen = () => {
  const navigation = useNavigation<HeatNavProp>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => {}} style={{ marginHorizontal: spacings.base }}>
            {/* <Icon name={"timer"} size={32} color={colors.almostWhite} /> */}
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
      <View style={{ marginLeft: spacings.base }}>
        <Text style={fonts.header}>{"Heats"}</Text>
        <Text style={fonts.subheader}>{"view & create heats"}</Text>
      </View>
      <ButtonAdd
        label={"add surf heat"}
        onPress={() => {}}
        style={{ marginHorizontal: spacings.base }}
      />
      <View style={{ padding: spacings.base }}>
        <Text style={{ color: colors.grey500, fontSize: 21 }}>{"Today's Event"}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>{"You haven't created any events!"}</Text>
      </View>
      <View style={{ padding: spacings.base }}>
        <Text style={{ color: colors.grey500, fontSize: 21 }}>{"Upcoming Heats"}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>{"You haven't created any heats!"}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    ...shared.card,
    ...shared.shadow,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacings.base,
    marginHorizontal: spacings.base,
  },
  cardText: {
    ...fonts.large,
    color: colors.grey500,
    textAlign: "center",
    padding: spacings.base,
  },
});
