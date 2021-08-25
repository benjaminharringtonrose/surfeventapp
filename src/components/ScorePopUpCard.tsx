import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { colors, shared, spacings } from "../common";
import { Button } from "./Button";
import WheelPicker from "./WheelPicker";

interface ScorePopUpCardProps {
  visible: boolean;
  label: string;
  onPress: (score: number) => void;
  onClose: () => void;
}

const integers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const tenths = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const ScorePopUpCard = (props: ScorePopUpCardProps) => {
  const [selectedIntegerIndex, setSelectedIntegerIndex] = useState(4);
  const [selectedTenthIndex, setSelectedTenthIndex] = useState(4);
  const [score, setScore] = useState<number>(
    Number(integers[selectedIntegerIndex]) + Number(tenths[selectedTenthIndex]) / 10,
  );

  const onSelectScore = () => {
    const score = Number(integers[selectedIntegerIndex]) + Number(tenths[selectedTenthIndex]) / 10;
    props.onPress(score);
  };
  return (
    <Modal isVisible={props.visible} onBackdropPress={() => props.onClose()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderRadius: shared.borderRadius,
              borderColor: colors.greyscale1,
            }}>
            <WheelPicker
              list={integers}
              value={selectedIntegerIndex}
              onValueChange={(index: number) => {
                setSelectedIntegerIndex(index);
              }}
            />
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.grey700,
                marginTop: spacings.small + 4,
              }}
            />
            <WheelPicker
              list={tenths}
              value={selectedTenthIndex}
              onValueChange={(index: number) => {
                setSelectedTenthIndex(index);
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Button
              type={"contained"}
              label={"Score"}
              onPress={onSelectScore}
              style={{ marginTop: spacings.base }}
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
