import React, { forwardRef, Ref } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { colors, fonts, shared, spacings } from "../common";
import { Button } from "./Button";

interface AlertAction {
  label: string;
  onPress: () => void;
  type: "text" | "bordered" | "contained" | undefined;
}

interface AlertProps {
  visible: boolean;
  label: string;
  actions: AlertAction[];
}

export const Alert = (props: AlertProps) => {
  const actions = props.actions.map((action, index) => {
    return { ...action, key: index + 1 };
  });

  return (
    <Modal isVisible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text
              style={[
                {
                  fontSize: 23,
                  textAlign: "center",
                  fontWeight: "400",
                  color: colors.almostWhite,
                },
              ]}>
              {props.label}
            </Text>
          </View>
          <View style={{ marginTop: spacings.base }}>
            {actions.map(action => {
              return (
                <Button
                  key={action.key}
                  type={action.type}
                  label={action.label}
                  onPress={action.onPress}
                  style={{ marginTop: spacings.xsmall }}
                />
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.greyscale9,
    borderRadius: shared.borderRadius,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
