import moment from "moment";
import React, { useRef } from "react";
import { View, StyleProp, ViewStyle, TouchableOpacity, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { colors, fonts, shared, spacings } from "../common";
import { FormDatePicker } from "./FormDatePicker";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationTextButton } from "./NavigationTextButton";

interface FormModalDatePickerProps {
  title?: string;
  label: string;
  value?: Date;
  error?: string;
  touched?: boolean;
  style?: StyleProp<ViewStyle>;
  onSelectDate: (date: Date) => void;
}

export const FormModalDatePicker = (props: FormModalDatePickerProps) => {
  const modalRef = useRef<Modalize>();

  return (
    <>
      <TouchableOpacity
        style={[
          {
            minHeight: 40,
            borderColor: colors.grey500,
            borderWidth: 1,
            backgroundColor: "white",
            borderRadius: shared.borderRadius,
          },
          props.style,
        ]}
        onPress={() => modalRef?.current?.open()}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "column",
            }}>
            <View style={{ marginBottom: spacings.xsmall }}>
              <Text
                style={{
                  ...fonts.small,
                  fontWeight: "700",
                  paddingLeft: spacings.small,
                  color: colors.grey700,
                  paddingTop: spacings.xsmall,
                }}>
                {props.label}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: spacings.small,
                paddingBottom: spacings.xsmall,
              }}>
              <Text style={[fonts.regular]}>
                {!!props?.value ? moment(props.value).format("MM/DD/YYYY") : "Select..."}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginRight: spacings.small,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Icon name={"chevron-down"} size={16} color={colors.grey800} />
          </View>
        </View>
      </TouchableOpacity>

      <View>
        <Portal>
          <Modalize ref={modalRef} adjustToContentHeight={true}>
            <View
              style={{
                marginHorizontal: spacings.base,
                marginBottom: spacings.base,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  marginTop: spacings.base,
                }}>
                <View
                  style={{
                    alignItems: "center",
                  }}>
                  <NavigationTextButton label={"Done"} onPress={() => modalRef?.current?.close()} />
                </View>
              </View>

              <View
                style={{
                  marginBottom: spacings.base,
                }}>
                <FormDatePicker
                  label={props.label}
                  value={props.value}
                  onSelectDate={date => props.onSelectDate(date)}
                  error={props.error}
                  touched={props.touched}
                />
              </View>
            </View>
          </Modalize>
        </Portal>
      </View>
      {!!props.error && !!props.touched && (
        <Text
          style={[
            fonts.regular,
            {
              marginTop: spacings.xsmall,
              marginLeft: spacings.small,
              color: colors.error,
            },
          ]}>
          {props.error}
        </Text>
      )}
    </>
  );
};
