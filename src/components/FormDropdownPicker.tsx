import React from "react";
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Modalize } from "react-native-modalize";
import { colors, fonts, shared, spacings } from "../common";
import Icon from "react-native-vector-icons/Ionicons";
import { ListPicker, ListPickerItem } from "./ListPicker";

interface FormDropdownPickerProps {
  title?: string;
  label?: string;
  value?: string;
  items: ListPickerItem[];
  onSelect: (value: string | number) => void;
  error?: string;
  touched?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const FormDropdownPicker = (props: FormDropdownPickerProps) => {
  const pickerRef = React.useRef<Modalize>(null);

  const onSelect = (id: string) => {
    props.onSelect(id);
    pickerRef.current?.close();
  };

  const onShow = () => {
    pickerRef.current?.open();
  };

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
        onPress={onShow}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
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
                {props.value || "Select..."}
              </Text>
              <Icon name={"chevron-down"} size={16} color={colors.almostWhite} />
            </View>
          </View>
          <ListPicker
            ref={pickerRef}
            headerTitle={props?.title || "Select An Option"}
            items={props.items}
            onBack={() => {
              pickerRef.current?.close();
            }}
            onSelect={onSelect}
            itemContainerStyle={{ alignItems: "flex-start" }}
          />
        </View>
      </TouchableOpacity>
      {!!props.error && !!props.touched && (
        <View>
          <Text
            style={{
              ...fonts.regular,
              marginTop: spacings.xsmall,
              color: colors.error,
            }}>
            {props.error}
          </Text>
        </View>
      )}
    </>
  );
};