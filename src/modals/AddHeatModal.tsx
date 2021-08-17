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
import { FormDropdownPicker } from "../components/FormDropdownPicker";

interface AddHeatFormProps {
  division?: string;
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
    if (!values.division) {
      return;
    }
    // const userDocRef = firestore().collection("users").doc(user?.uid);
  };

  const ProfileSchema = Yup.object().shape({
    division: Yup.string().required("Required"),
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
          initialValues={{ division: undefined }}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}>
          {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, touched, errors }) => (
            <View style={{ marginHorizontal: spacings.base }}>
              <FormDropdownPicker
                title={"Select Division"}
                label={"Division"}
                value={values.division}
                items={DIVISIONS}
                error={errors.division}
                touched={touched.division}
                onSelect={id => setFieldValue("division", id)}
                style={{ marginTop: spacings.base }}
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

export const DIVISIONS = [
  { id: "BOYSU12", label: "Boys 11 & Under" },
  { id: "BOYSU14", label: "Boys 13 & Under" },
  { id: "BOYSU16", label: "Boys 15 & Under" },
];
