import * as React from "react";
import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fonts, spacings } from "../common";
import { ListPickerItem } from "./ListPicker";
import { ModalHeader } from "./ModalHeader";

export interface SectionListPickerItem {
  title: string;
  data: ListPickerItem[];
}

export interface SectionListPickerProps {
  sections: SectionListPickerItem[];
  headerTitle?: string;
  onBack: () => void;
  onSelect: (value: ListPickerItem) => void;
  itemContainerStyle?: StyleProp<ViewStyle>;
}

export const SectionListPicker = React.forwardRef((props: SectionListPickerProps, ref) => {
  const insets = useSafeAreaInsets();

  return (
    <Portal>
      <Modalize
        ref={ref as React.Ref<Modalize>}
        disableScrollIfPossible={true}
        adjustToContentHeight={true}
        HeaderComponent={() => (
          <ModalHeader
            title={props.headerTitle || "Select Item"}
            showCloseButton={true}
            onClose={props.onBack}
          />
        )}
        sectionListProps={{
          sections: props.sections,
          renderItem: ({ item }) => {
            console.log("YUHHHHH: ", item.label);
            return (
              <TouchableOpacity
                onPress={() => {
                  props.onSelect(item);
                }}
                style={[
                  {
                    minHeight: 50,
                    alignItems: "flex-end",
                    paddingHorizontal: spacings.base,
                    paddingVertical: spacings.small,
                    justifyContent: "center",
                  },
                  props.itemContainerStyle,
                ]}>
                <Text style={[fonts.regular, { color: colors.almostWhite }]}>{item.label}</Text>
              </TouchableOpacity>
            );
          },
          renderSectionHeader: ({ section: { title } }) => {
            return (
              <View
                style={{
                  paddingLeft: spacings.base,
                  paddingVertical: spacings.small,
                  backgroundColor: colors.greyscale9,
                  borderBottomColor: colors.greyscale5,
                  borderBottomWidth: 1,
                }}>
                <Text style={{ fontSize: 19, fontWeight: "200", color: colors.grey700 }}>
                  {title}
                </Text>
              </View>
            );
          },

          keyExtractor: item => item.id.toString(),
          contentContainerStyle: { paddingBottom: insets.bottom },
          style: { backgroundColor: colors.greyscale9 },
        }}
      />
    </Portal>
  );
});
