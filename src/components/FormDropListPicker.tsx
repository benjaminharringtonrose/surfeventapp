import React from "react";
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Modalize } from "react-native-modalize";
import { colors, fonts, spacings } from "../common";
import Icon from "react-native-vector-icons/Ionicons";
import { ListPicker, ListPickerItem } from "./ListPicker";

interface FormDropListPickerProps {
  title?: string;
  label?: string;
  placeholder?: string;
  value?: ListPickerItem;
  items: ListPickerItem[];
  onSelect: (value: ListPickerItem) => void;
  error?: string;
  touched?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const FormDropListPicker = (props: FormDropListPickerProps) => {
  const pickerRef = React.useRef<Modalize>(null);

  const onSelect = (item: ListPickerItem) => {
    props.onSelect(item);
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
                  fontWeight: "600",
                  color: colors.grey500,
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
                paddingBottom: spacings.xsmall,
                borderBottomWidth: 2,
                borderBottomColor: colors.greyscale1,
              }}>
              <Text style={[fonts.regular, { color: colors.grey500 }]}>
                {props.value?.label || props?.placeholder || "Select..."}
              </Text>
              <Icon name={"chevron-down"} size={16} color={colors.grey500} />
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
