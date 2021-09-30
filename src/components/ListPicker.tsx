import * as React from "react";
import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { fonts, spacings } from "../common";
import { useColors } from "../hooks/useColors";
import { ModalHeader } from "./ModalHeader";

export interface ListPickerItem {
  id: any;
  label: any;
}

export interface ListPickerProps {
  items: Array<ListPickerItem>;
  headerTitle?: string;
  onBack: () => void;
  onSelect: (value: ListPickerItem) => void;
  itemContainerStyle?: StyleProp<ViewStyle>;
}

export const ListPicker = React.forwardRef((props: ListPickerProps, ref) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const renderCells = ({ item }: { item: ListPickerItem }) => {
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
  };

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
        flatListProps={{
          ListFooterComponentStyle: { height: insets.bottom },
          data: props.items,
          renderItem: renderCells,
          ItemSeparatorComponent: Separator,
          keyExtractor: item => item.id.toString(),
          contentContainerStyle: { paddingBottom: insets.bottom },
          style: { backgroundColor: colors.greyscale9 },
        }}
      />
    </Portal>
  );
});

const Separator = () => {
  const colors = useColors();
  return <View style={{ height: 1, backgroundColor: colors.grey800 }} />;
};
