import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { shared, sharedColors, spacings, Wave } from "../common";
import { useColors } from "../hooks/useColors";
import { Button } from "./Button";
import { ButtonX } from "./ButtonX";
import { IRadioButtonOption, RadioButton } from "./RadioButton";
import WheelPicker from "./WheelPicker";

interface IScorePopUpCardProps {
  visible: boolean;
  wave?: Wave;
  label: string;
  onApply: ({ score, disqualified }: { score: number; disqualified: boolean }) => void;
  onRemove: () => void;
  onClose: () => void;
  isAddWaveCell: boolean;
}

const integers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const tenths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const ScorePopUpCard = (props: IScorePopUpCardProps) => {
  const colors = useColors();
  const [selectedIntegerIndex, setSelectedIntegerIndex] = useState(0);
  const [selectedTenthIndex, setSelectedTenthIndex] = useState(0);
  const [radioOption, setRadioOption] = useState<IRadioButtonOption>({
    id: 0,
    label: "Disqualify",
    selected: false,
  });

  useEffect(() => {
    if (selectedIntegerIndex === 10) {
      setSelectedTenthIndex(0);
    }
  });

  const onModalWillShow = () => {
    const scoreParts = props.wave?.score
      .toString()
      .split(".")
      .map(score => Number(score));

    setSelectedIntegerIndex(scoreParts?.[0] || 0);
    setSelectedTenthIndex(scoreParts?.[1] || 0);
    setRadioOption({
      ...radioOption,
      selected: !!props.wave?.disqualified,
    });
  };

  const onSelectScore = () => {
    const score = Number(integers[selectedIntegerIndex]) + Number(tenths[selectedTenthIndex]) / 10;
    props.onApply({ score, disqualified: radioOption.selected });
  };

  console.log("PROPS.WAVE --> ", props.wave);

  return (
    <Modal
      isVisible={props.visible}
      onModalWillShow={onModalWillShow}
      onBackdropPress={() => props.onClose()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: "row" }}>
            {!props.isAddWaveCell ? (
              <View style={{ justifyContent: "center" }}>
                <RadioButton
                  onPress={() =>
                    setRadioOption({ ...radioOption, selected: !radioOption.selected })
                  }
                  selected={radioOption.selected}
                  key={radioOption.id}
                  label={radioOption.label}
                  labelStyle={{ color: colors.almostWhite }}
                  style={{ marginBottom: spacings.small, marginRight: spacings.base }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingRight: spacings.small,
                  }}>
                  <View style={{ flex: 1 }}>
                    <Button
                      type={"contained"}
                      label={"Save"}
                      onPress={onSelectScore}
                      style={{ marginTop: spacings.xsmall, marginRight: spacings.tiny }}
                    />
                    <Button
                      type={"bordered"}
                      label={"Remove"}
                      onPress={props.onRemove}
                      style={{ marginTop: spacings.xsmall }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
            <View>
              <View style={styles.scorePickerContainer}>
                <WheelPicker
                  list={integers}
                  value={selectedIntegerIndex}
                  onValueChange={(index: number) => {
                    setSelectedIntegerIndex(index);
                  }}
                />
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.grey700,
                    marginTop: spacings.base,
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
              {props.isAddWaveCell && (
                <Button
                  type={"contained"}
                  label={"Save"}
                  onPress={onSelectScore}
                  style={{ marginTop: spacings.small }}
                />
              )}
            </View>
          </View>
        </View>
        <ButtonX onPress={() => props.onClose()} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  modalView: {
    alignItems: "center",
    marginTop: spacings.base,
    backgroundColor: sharedColors.greyscale9,
    borderRadius: shared.borderRadius,
    padding: spacings.small,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scorePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: shared.borderRadius,
    borderColor: sharedColors.greyscale1,
  },
});
