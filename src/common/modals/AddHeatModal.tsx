import React, { forwardRef, Ref, useEffect } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../colors";
import { shared } from "../shared";

interface AddHeatModalProps {
  onClose: () => void;
}
export const AddHeatModal = forwardRef((props: AddHeatModalProps, ref) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {}, []);
  return (
    <Portal>
      <Modalize
        ref={ref as Ref<Modalize>}
        adjustToContentHeight={true}
        childrenStyle={{
          paddingBottom: insets.bottom,
          height: 500,
          backgroundColor: colors.background,
          borderTopStartRadius: shared.borderRadius,
          borderTopEndRadius: shared.borderRadius,
        }}></Modalize>
    </Portal>
  );
});
