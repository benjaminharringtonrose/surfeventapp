import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import firestore from "@react-native-firebase/firestore";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../common/colors";
import { shared } from "../common/shared";
import { spacings } from "../common";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";

interface AddHeatFormProps {
  heatName?: string;
}

interface AddHeatModalProps {
  onClose: () => void;
}
export const AddHeatModal = forwardRef((props: AddHeatModalProps, ref) => {
  const formRef = React.useRef<FormikProps<AddHeatFormProps>>(null);
  const [loadingAddHeat, setLoadingAddHeat] = useState<boolean>(false);

  const insets = useSafeAreaInsets();

  useEffect(() => {}, []);

  const onSubmit = (values: AddHeatFormProps) => {
    if (!values.heatName) {
      return;
    }
    // const userDocRef = firestore().collection("users").doc(user?.uid);
  };

  const ProfileSchema = Yup.object().shape({
    heatName: Yup.string().required("Required"),
  });
  return (
    <Portal>
      <Modalize
        ref={ref as Ref<Modalize>}
        adjustToContentHeight={true}
        childrenStyle={{
          paddingBottom: insets.bottom,
          backgroundColor: colors.background,
          borderTopStartRadius: shared.borderRadius,
          borderTopEndRadius: shared.borderRadius,
        }}>
        <Formik
          innerRef={formRef}
          initialValues={{ heatName: "" }}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <View style={{ marginHorizontal: spacings.base }}>
              <FormInput
                label={"Heat Name"}
                placeholder={"Junior Men's Heat 1"}
                onChangeText={handleChange("eventName")}
                onBlur={handleBlur("eventName")}
                value={values.heatName}
                error={errors.heatName}
                touched={touched.heatName}
              />
              <Button
                type={"contained"}
                label={"Add"}
                loading={loadingAddHeat}
                onPress={() => handleSubmit()}
                style={{ marginTop: spacings.base }}
              />
            </View>
          )}
        </Formik>
      </Modalize>
    </Portal>
  );
});
