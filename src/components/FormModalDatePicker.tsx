import moment from "moment";
import React, { useRef } from "react";
import { View, StyleProp, ViewStyle, TouchableOpacity, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { colors, DateMode, fonts, spacings } from "../common";
import { FormDatePicker } from "./FormDatePicker";
import Icon from "react-native-vector-icons/Ionicons";
import { ModalHeader } from "./ModalHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FormModalDatePickerProps {
  title?: string;
  label: string;
  value?: Date;
  mode: DateMode;
  error?: string;
  touched?: boolean;
  style?: StyleProp<ViewStyle>;
  onSelectDate: (date: Date) => void;
}

export const FormModalDatePicker = (props: FormModalDatePickerProps) => {
  const modalRef = useRef<Modalize>();
  const insets = useSafeAreaInsets();

  const getTitle = (mode: DateMode) => {
    switch (mode) {
      case "date":
        return "Select Date";
      case "datetime":
      case "time":
        return "Select Time";
      default:
        return "-";
    }
  };

  const getLabel = (value: any, mode: DateMode) => {
    switch (mode) {
      case "date":
        return moment(value).format("MM/DD/YYYY");
      case "datetime":
        return moment(value).format("dddd, MMMM Do YYYY, h:mm a");
      case "time":
        return moment(value).format("h:mm a");
      default:
        return "-";
    }
  };

  console.log(props.value);

  return (
    <>
      <TouchableOpacity
        style={[
          {
            minHeight: 40,
            backgroundColor: colors.background,
          },
          props.style,
        ]}
        onPress={() => modalRef?.current?.open()}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
            }}>
            <View style={{ marginBottom: spacings.xsmall }}>
              <Text
                style={{
                  ...fonts.small,
                  fontWeight: "700",
                  color: colors.grey500,
                  paddingTop: spacings.xsmall,
                }}>
                {props.label}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: spacings.xsmall,
                borderBottomWidth: 1,
                borderBottomColor: colors.grey800,
              }}>
              <Text style={[fonts.regular, { color: colors.almostWhite }]}>
                {!!props?.value ? getLabel(props.value, props.mode) : "Select..."}
              </Text>
              <Icon name={"chevron-down"} size={16} color={colors.almostWhite} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Portal>
        <Modalize
          ref={modalRef}
          adjustToContentHeight={true}
          childrenStyle={{ backgroundColor: colors.background, paddingBottom: insets.bottom }}
          HeaderComponent={() => (
            <ModalHeader
              title={getTitle(props.mode)}
              showCloseButton={true}
              onClose={() => modalRef?.current?.close()}
              showDoneButton={true}
              onDone={() => modalRef?.current?.close()}
            />
          )}>
          <FormDatePicker
            label={""}
            value={props.value}
            mode={props.mode}
            onSelectDate={date => props.onSelectDate(date)}
            error={props.error}
            touched={props.touched}
          />
        </Modalize>
      </Portal>
      {!!props.error && !!props.touched && (
        <Text
          style={[
            fonts.regular,
            {
              marginTop: spacings.xsmall,
              color: colors.error,
            },
          ]}>
          {props.error}
        </Text>
      )}
    </>
  );
};
