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
            borderColor: colors.grey500,
            borderWidth: 1,
            backgroundColor: "white",
            borderRadius: shared.borderRadius,
          },
          props.style,
        ]}
        onPress={onShow}>
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
              <Text style={[fonts.regular]}>{props.value || "Select..."}</Text>
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
        <View style={{ marginLeft: spacings.small }}>
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
