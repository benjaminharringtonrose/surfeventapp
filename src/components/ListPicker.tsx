import * as React from "react";
import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fonts, shared, spacings } from "../common";
import { ModalHeader } from "./ModalHeader";

export interface ListPickerItem {
  id: any;
  label: string;
}

export interface ListPickerProps {
  items: Array<ListPickerItem>;
  headerTitle?: string;
  onBack: () => void;
  onSelect: (id: string) => void;
  itemContainerStyle?: StyleProp<ViewStyle>;
}

export const ListPicker = React.forwardRef((props: ListPickerProps, ref) => {
  const insets = useSafeAreaInsets();

  const renderCells = ({ item }: { item: ListPickerItem }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.onSelect(item.id);
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
        <Text style={fonts.regular}>{item.label}</Text>
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
        }}
      />
    </Portal>
  );
});

const Separator = () => <View style={{ height: 1, backgroundColor: colors.grey200 }} />;
