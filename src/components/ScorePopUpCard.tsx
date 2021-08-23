import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { colors, shared, spacings } from "../common";
import { Button } from "./Button";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import WheelPicker from "./WheelPicker";

interface ScoreAction {
  label: string;
  onPress: () => void;
  type: "text" | "bordered" | "contained" | undefined;
}

interface ScorePopUpCardProps {
  visible: boolean;
  label: string;
  onPress: () => void;
}

export const ScorePopUpCard = (props: ScorePopUpCardProps) => {
  const [selectedIntegerIndex, setSelectedIntegerIndex] = useState(4);
  const [selectedTenthIndex, setSelectedTenthIndex] = useState(4);
  const [score, setScore] = useState<string | number | undefined>(undefined);

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const onSelectScore = (score: string | number) => {
    setScore(score);
  };
  return (
    <Modal isVisible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={[
              {
                fontSize: 24,
                fontWeight: "300",
                color: colors.almostWhite,
              },
            ]}>
            {`Score of ${numbers[selectedIntegerIndex]}.${numbers[selectedTenthIndex]}`}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <WheelPicker
              list={numbers}
              value={selectedIntegerIndex}
              onValueChange={(index: any) => setSelectedIntegerIndex(index)}
            />
            <WheelPicker
              list={numbers}
              value={selectedTenthIndex}
              onValueChange={(index: any) => setSelectedTenthIndex(index)}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Button
              type={"contained"}
              label={"Judge"}
              onPress={props.onPress}
              style={{ marginTop: spacings.xsmall }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 22,
  },
  modalView: {
    alignItems: "center",
    margin: spacings.base,
    backgroundColor: colors.greyscale9,
    borderRadius: shared.borderRadius,
    padding: spacings.base,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
